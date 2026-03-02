// Supabase Edge Function: ewaste-submit
// Recebe submissions de lixo eletrônico do Botpress (WhatsApp)
//
// Deploy: supabase functions deploy ewaste-submit
// Teste: curl -X POST https://[PROJECT_URL]/functions/v1/ewaste-submit \
//   -H "Authorization: Bearer [ANON_KEY]" \
//   -H "Content-Type: application/json" \
//   -d '{"phone":"+5565999999999","photo_url":"https://example.com/foto.jpg","description":"TV antiga"}'

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EwasteSubmitPayload {
  phone: string;
  photo_url: string;
  description: string;
  bot_conversation_id?: string;
  campaign?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload: EwasteSubmitPayload = await req.json();

    // Validação básica
    if (!payload.phone || !payload.photo_url || !payload.description) {
      return new Response(
        JSON.stringify({
          error: "Campos obrigatórios: phone, photo_url, description",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Normalizar telefone (remover espaços, garantir formato)
    const normalizedPhone = payload.phone.replace(/\s/g, "").replace(/^0+/, "");

    // Criar cliente Supabase com service role para bypass de RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Tentar encontrar o usuário pelo telefone
    const { data: userMatch } = await supabase
      .from("users")
      .select("id, name, phone")
      .or(`phone.eq.${normalizedPhone},phone.eq.+${normalizedPhone},phone.eq.+55${normalizedPhone}`)
      .limit(1)
      .single();

    // Inserir a submission
    const { data: submission, error: insertError } = await supabase
      .from("ewaste_submissions")
      .insert({
        user_phone: normalizedPhone,
        user_id: userMatch?.id || null,
        photo_url: payload.photo_url,
        material_description: payload.description,
        status: "pending",
        campaign: payload.campaign || "eletronicos-marco-2026",
        bot_conversation_id: payload.bot_conversation_id || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Erro ao inserir submission:", insertError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar registro", details: insertError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Resposta de sucesso
    return new Response(
      JSON.stringify({
        success: true,
        message: userMatch
          ? `Registro salvo! Usuário ${userMatch.name} identificado.`
          : "Registro salvo! Usuário não encontrado no sistema — o admin pode vincular depois.",
        submission_id: submission.id,
        user_found: !!userMatch,
        user_name: userMatch?.name || null,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Erro na Edge Function:", err);
    return new Response(
      JSON.stringify({ error: "Erro interno", details: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

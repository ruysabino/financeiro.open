function corsHeaders() {
  return {
    "content-type": "application/json; charset=UTF-8",
    "cache-control": "no-store, no-cache, must-revalidate",
    "x-content-type-options": "nosniff"
  };
}

function unauthorized() {
  return new Response(JSON.stringify({ error: "Não autenticado" }), {
    status: 401,
    headers: corsHeaders()
  });
}

function accessRequired(env) {
  return String(env.REQUIRE_ACCESS || "true").toLowerCase() !== "false";
}

export async function onRequestGet({ request, env }) {
  // Cloudflare Access sits in front of this same-origin API in production.
  // When enabled, reject direct calls that did not pass through Access.
  if (accessRequired(env)) {
    const email = request.headers.get("CF-Access-Authenticated-User-Email");
    if (!email) return unauthorized();
  }

  const url = new URL(request.url);
  const partner = (url.searchParams.get("partner") || "").trim();
  const seller = (url.searchParams.get("seller") || "").trim();
  const title = (url.searchParams.get("title") || "").trim();
  const movement = (url.searchParams.get("movement") || "").trim();
  const reneg = (url.searchParams.get("reneg") || "").trim();

  const where = [];
  const binds = [];
  if (partner) { where.push("parceiro LIKE ?"); binds.push(`%${partner}%`); }
  if (seller) { where.push("vendedor = ?"); binds.push(seller); }
  if (title) { where.push("titulo = ?"); binds.push(title); }
  if (movement) { where.push("movimento = ?"); binds.push(movement); }
  if (reneg) { where.push("renegociados = ?"); binds.push(reneg); }

  let sql = `SELECT parceiro AS "PARCEIRO", data AS "DATA", vencimento AS "VENCIMENTO",
    atraso AS "ATRASO", documento AS "DOCUMENTO", vendedor AS "VENDEDOR",
    valor AS "VALOR", movimento AS "MOVIMENTO", renegociados AS "Renegociados ?",
    banco AS "Banco", titulo AS "TITULO", historico AS "Histórico"
    FROM titles`;
  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " ORDER BY parceiro COLLATE NOCASE, vencimento";

  const result = await env.DB.prepare(sql).bind(...binds).all();

  return new Response(JSON.stringify(result.results), {
    headers: corsHeaders()
  });
}

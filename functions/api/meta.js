export async function onRequestGet({ request, env }) {
  const email = request.headers.get("CF-Access-Authenticated-User-Email");
  if (String(env.REQUIRE_ACCESS || "true").toLowerCase() !== "false" && !email) {
    return new Response(JSON.stringify({error:"Não autenticado"}), {status:401, headers:{"content-type":"application/json"}});
  }
  const [sellers,titles,movements,reneg] = await Promise.all([
    env.DB.prepare("SELECT DISTINCT vendedor value FROM titles WHERE vendedor IS NOT NULL AND vendedor<>'' ORDER BY vendedor").all(),
    env.DB.prepare("SELECT DISTINCT titulo value FROM titles WHERE titulo IS NOT NULL AND titulo<>'' ORDER BY titulo").all(),
    env.DB.prepare("SELECT DISTINCT movimento value FROM titles WHERE movimento IS NOT NULL AND movimento<>'' ORDER BY movimento").all(),
    env.DB.prepare("SELECT DISTINCT renegociados value FROM titles WHERE renegociados IS NOT NULL AND renegociados<>'' ORDER BY renegociados").all()
  ]);
  return Response.json({
    user: email || null,
    sellers:sellers.results.map(x=>x.value),
    titles:titles.results.map(x=>x.value),
    movements:movements.results.map(x=>x.value),
    renegotiated:reneg.results.map(x=>x.value)
  }, {headers:{"cache-control":"private, no-store"}});
}

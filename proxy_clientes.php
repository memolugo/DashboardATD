<?php
header('Content-Type: application/json; charset=utf-8');
$REMOTE = 'https://dev-ltqnu.morelos.gob.mx/clientes1_data.php';
if (isset($_GET['mock'])) {
  echo json_encode([
    "activos"=>358,"segmento_count"=>46,"total_bytes"=>137857798310,
    "clientes_historico"=>array_map(fn($i)=>["timestamp"=>time()-$i*3600,"count"=>max(5, 360-($i*12))], range(0,23)),
    "clientes_por_ap"=>["AP_Plaza"=>90,"AP_Centro"=>88,"AP_Administración"=>77]
  ]);
  exit;
}
$ch=curl_init($REMOTE);
curl_setopt_array($ch,[CURLOPT_RETURNTRANSFER=>true,CURLOPT_FOLLOWLOCATION=>true,CURLOPT_CONNECTTIMEOUT=>10,CURLOPT_TIMEOUT=>25,
CURLOPT_HTTPHEADER=>['User-Agent: LTQNU-Fusion-Proxy','Accept: application/json']]);
$resp=curl_exec($ch); $err=curl_error($ch); $code=curl_getinfo($ch,CURLINFO_HTTP_CODE); curl_close($ch);
if($err || $code>=400 || !$resp){ http_response_code(502); echo json_encode(['error'=>'Proxy fetch failed','detail'=>$err?:("HTTP $code")]); exit; }
echo $resp;

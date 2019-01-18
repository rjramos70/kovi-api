'use strict';

module.exports.calc = (event, context, callback) => {
  
  // código de autorização modelo
  var authString = 'Bc5v5MImCqfcnm6tmujkx1JcbL';

  // compara se o paraetro 'Authorization' enviado nos headers são iguais
  if(authString.localeCompare(event.headers.Authorization) !== 0){
    // não sendo retorna um JSON alterando o status para 401 mais uma mensagem.
    
    const response = { 
      statusCode: 401, 
      body: JSON.stringify({ 
        message: 'Código de autorização válido é necessário no header da requisição !'
      })
    }

    callback(null, response);
  }
  // cria uma constante com o conteúdo do body da requisição
  const body = JSON.parse(event.body);

  // cria um JSON de resposta, alteradno o status para 200, e utilizando a função 
  // 'calculaDistancia' para retornar a distância entre as duas coordenadas. 
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      distancia: Dist(
                          parseFloat(body.lat1), 
                          parseFloat(body.long1), 
                          parseFloat(body.lat2), 
                          parseFloat(body.long2), 
                          "MT", 
                          1)
    })
  };

  // retorna o callback com a resposta
  callback(null, response);  
};
// ======================== Funções Privadas =========================================== //
/**
 * 
 * @param {*} latitude1 
 * @param {*} longitude1 
 * @param {*} latitude2 
 * @param {*} longitude2 
 * @param {*} unidade 
 * @param {*} nm_dec 
 * 
 * Esta função calcula a distância entre dois pontos (dados a latitudes e longitudes destes pontos). 
 * Ele está sendo usado para calcular a distância entre dois locais usando prododutos GeoDataSource (TM).
 * 
 * Definições:
 *    Latitudes sul são negativas, já Longitudes lestes são positivas.
 * 
 * Parâmetros:
 *    latitude1, longitude1 = respectivas latitude e longitude do primeiro ponto(em graus e com as casas decimais);
 *    latitude2, longitude2 = respectivas latitude e longitude do segundo ponto(em graus e com as casas decimais);
 *    unit = a unidade que deseje o resultado
 *        onde: 'M' é milhas terrestres (padrão) 
 *              'K' é quilômetros
 *              'N' é milhas náuticas
 *              'MT'é metros
 *    nm_dec = números de casas decimais a serem formatadas
 * 
 *  Referência: https://www.geodatasource.com/developers/javascript
 */
/*
function calculaDistancia(latitude1, longitude1, latitude2, longitude2, unidade, nm_dec) {
  
  console.log(` >> latitude1 : ${latitude1}`);
  console.log(` >> longitude1: ${longitude1}`);
  console.log(` >> latitude2 : ${latitude2}`);
  console.log(` >> longitude2: ${longitude2}`);
  console.log(` >> unidade   : ${unidade}`);
  console.log(` >> nm_dec    : ${nm_dec}`);
  
  
  // testa se latitudes e longitudes são iguais, significa mesmo ponto
  if ((latitude1 == latitude2) && (longitude1 == longitude2)) {
		return 0;
	}
  else 
  {
    // calcula os Radianos
    // Radiano = PI * (latitude / 180)
    var radlat1 = Math.PI * (latitude1/180);
		var radlat2 = Math.PI * (latitude2/180);
    // calculando o 'teta'
    var theta = longitude1 - longitude2;
    // calculando o Radiano de 'teta'
    var radtheta = Math.PI * (theta/180);
    // calculando a distância entre os dois pontos
    // Seno do Radiano da latitude1 * Seno do Radiano da latitude2 + Cosseno do Radiano da latitude1 * Cosseno do Radiano da latitude2 * Cosseno do Radiano de Teta.
    var dist =  Math.sin(radlat1) * Math.sin(radlat2) + 
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    
    console.log(` >> dist: ${dist}`);
                
    // se distancia maior que um, faz a correção para um.
    if (dist > 1) {
			dist = 1;
		}
    // distância recebe o Cosseno da distância
    dist = Math.acos(dist);
 
    console.log(` >> Math.acos(dist): ${dist}`);

    // converte para milhas (valor default)
    dist = dist * 60 * 1.1515;
    // converte para kilometros
		if (unidade === "K") { dist = dist * 1.609344 }
    // converte para milhas nauticas
    if (unidade === "N") { dist = dist * 0.8684 }
    // converte para metros
    // if (unidade === "MT") { dist = (dist * 1.609344) * 1000 }
    console.log(` >> return dist : ${dist}`);
    
    return dist;

    // formata casas decimais antes de retirnar
    // return parseFloat(dist.toFixed(nm_dec));
	}
}
*/
/**
 * @param {*} lat1 
 * @param {*} lon1 
 * @param {*} lat2 
 * @param {*} lon2 
 * 
 * Esta função calcula a distância entre dois pontos no globo terrestre.
 * 
 * Referência: https://www.mapanet.eu/PT/resources/Script-Distance.htm
 */

function Dist(lat1, lon1, lat2, lon2, unid, dec){
  // rad = function(x) {return x*Math.PI/180;}

  var R     = 6378.137;                  //Raio da Terra no km (WGS84)
  var dLat  = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  
  // converte de metros para quilometros
  if(unid === "MT"){
    d = d * 1000;
  }

  return d.toFixed(dec);     // retorno com a quantidade de casas decimais passadas como parâmetro 
}

// função que retorna o Radiano de um valor.
function rad(x){
  return (x * Math.PI/180);
}

/**
 * 
 * @param {*} lat1 
 * @param {*} lon1 
 * @param {*} lat2 
 * @param {*} lon2 
 * @param {*} unit 
 * @param {*} dec 
 * 
 * Outra funçãoo tirada do site: https://www.geodatasource.com/developers/javascript
 * 
 * Porém esta função volta e meia alterava o resultado esperado.
 */
function distance(lat1, lon1, lat2, lon2, unit, dec) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    if (unit=="MT") { dist = (dist * 0.8684) * 1000 }
		return dist.toFixed(dec);
	}
}

import { ZoomInOut } from './Zoom/ZoomInOut.js';

let logMessages = false;

function ConfigsLeaflet(configs) {
    return {
        zoomControl: configs.configuracoesLeaflet.zoomControl,
        zoomSnap: configs.configuracoesLeaflet.zoomSnap,
        zoomDelta: configs.configuracoesLeaflet.zoomDelta,
        minZoom: configs.zoom.min,
        maxZoom: configs.zoom.max,
    };
}

function AdicionaCoordenadasMouse(map, configuracoesLeaflet) {
    let crs = configuracoesLeaflet.crs;
    let sistema = configuracoesLeaflet.sistema;
    let proj4text = configuracoesLeaflet.proj4text;
    let projCRS = new L.Proj.CRS(crs, proj4text);
    let mousePosControl = L.control.mousePosition({
        position: "bottomleft",
        emptyString: "Coordenadas indisponíveis",
        formatter: function (lng, lat) {
            let pt = projCRS.project(L.latLng(lat, lng));
            if (sistema == 'utm') {
                return "" + pt.y.toFixed(0) + " N : " + pt.x.toFixed(0) + " E";
            }
            return "<div style='padding: 0.5rem; border:1px solid black'>Lat.:" + pt.y.toFixed(5) + " <br> Lon.:" + pt.x.toFixed(5) + "</div>";
        }
    });
    map.addControl(mousePosControl);
    logMessages && console.log("   [CreateMap] Coordenadas do mouse adicionada ao mapa.");
}

function AdicionaEscala(map, largura=150, posicao="bottomright") {
    let escala = L.control.scale({
        position: posicao,
        metric: true,
        imperial: false,
        maxWidth: largura,
        
    }).addTo(map)
    
    logMessages && console.log("   [CreateMap] Escala adicionada ao mapa.");
}

function FuncaoVisaoInicial(map, x, y, z) {
    window.SetaVisaoInicial = function () {
        return map.setView([y,x], z);
    };
    logMessages && console.log("   [CreateMap] Função de resetar para visão inicial adicionada.");
}

function FuncoesZoom(map) {
    ZoomInOut(map, window, logMessages);
}

function AdicionaAttribution(map, textoAttribution) {
    map.attributionControl.setPrefix(textoAttribution);
    logMessages && console.log("   [CreateMap] Attribution adicionado ao mapa.");
}

function CriaMenuContexto(map, configuracoesLeaflet) {
    let crs = configuracoesLeaflet.crs;
    let sistema = configuracoesLeaflet.sistema;
    let proj4text = configuracoesLeaflet.proj4text;
    let projCRS = new L.Proj.CRS(crs, proj4text);
    let popup = L.popup();

    map.on("contextmenu", (e) => {
        let coordenada = projCRS.project(L.latLng(e.latlng.lat, e.latlng.lng));
        if (sistema == 'utm') {
            let content = "<b>N</b>: " + coordenada.y.toFixed(0) + "<br><b>E</b>: " + coordenada.x.toFixed(0) + "<br>";
        }
        let content = "<b>Lat.</b>: &nbsp;&nbsp;" + coordenada.y.toFixed(5) + "<br><br><b>Lon.</b>: &nbsp;&nbsp;" + coordenada.x.toFixed(5) + "<br><br> <b>Data:</b> &nbsp;&nbsp;" + formatarDataHora();
        popup.setLatLng(e.latlng).setContent(content).openOn(map);
    });
    logMessages && console.log("   [CreateMap] Menu de contexto adicionado ao mapa.");
}

function FuncaoMapaInformacoes(mapa) {
    window.MapaInformacoes = function () {
        let zoom = mapa.getZoom();
        let centro = mapa.getCenter();
        let bounds = mapa.getBounds();
        let informacoes = {
            zoom:zoom,
            centro:centro,
            bounds:bounds,
            xyz: {
                x: centro.lng,
                y: centro.lat,
                z: zoom
            }
        };
        let userInput = prompt("Digite as coordenadas em ordem 'latitude longitude'\n\nSepare as coordenadas por espaço.\n\nEx:\n-23.123456 -46.123456");
        let userInputText = userInput.split(" ");
        let userInputLat = parseFloat(userInputText[0]);
        let userInputLng = parseFloat(userInputText[1]);
        let markerIcon = L.icon({
            iconUrl: '/maps/icons/marker-icon.png',
            shadowUrl: '/maps/icons/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });
        let marker = L.marker([userInputLat, userInputLng], {icon : markerIcon}).addTo(mapa);
        mapa.setView([userInputLat, userInputLng], 15);
        return informacoes;
    };
    logMessages && console.log(mapa);
}

function formatarDataHora() {
    const agora = new Date();

    // Obtendo componentes da data
    const dia = agora.getDate().toString().padStart(2, '0');
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0'); // Mês é base 0
    const ano = agora.getFullYear();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');

    // Criando a string formatada
    const dataHoraFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;

    // Exibindo a string formatada
    return dataHoraFormatada;
}



export {
    ConfigsLeaflet,
    AdicionaCoordenadasMouse,
    AdicionaEscala,
    FuncaoVisaoInicial,
    FuncoesZoom,
    AdicionaAttribution,
    CriaMenuContexto,
    FuncaoMapaInformacoes
}
// SISTEMA DE GESTIÓN TERRITORIAL E INTELIGENCIA URBANA
// BARRIO GOBERNADOR JUAN MELIS - LA RIOJA CAPITAL

// Base de Datos Estática de Manzanas y Lotes Reales (Manzanas A a N)
const MANZANAS_DATA = {
    "A": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
    "B": [], // Área comunitaria
    "C": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
    "D": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
    "E": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"],
    "F": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27"],
    "G": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"],
    "N": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
    "H": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"],
    "I": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    "J": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
    "K": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
    "L": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    "M": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"]
};

// Base de Datos de Lotes Baldíos (se pintan de azul en el plano)
const LOTES_BALDIOS = {
    "E": ["10"],
    "F": ["5"],
    "H": ["6", "16"],
    "N": ["23"],
    "J": ["7"],
    "I": ["9"],
    "L": ["8"]
};

function isLotBaldio(blockId, lotName) {
    return LOTES_BALDIOS[blockId] && LOTES_BALDIOS[blockId].includes(lotName);
}

// Función geométrica para posicionar con precisión quirúrgica cada lote de cada manzana según la imagen original
function getLotGeometry(blockId, lotName) {
    if (database.customLotGeometries && database.customLotGeometries[blockId] && database.customLotGeometries[blockId][lotName]) {
        return database.customLotGeometries[blockId][lotName];
    }
    let geom = { x: 0, y: 0, w: 10, h: 10 };
    
    if (blockId === "A") {
        const layout = BLOCK_LAYOUTS["A"];
        const leftLots = ["1", "2", "3", "4"];
        const topLots = ["5", "6", "7", "8", "9", "10"];
        const rightLots = ["11", "12", "13", "14"];
        
        if (leftLots.includes(lotName)) {
            const i = leftLots.indexOf(lotName);
            geom = { x: layout.x, y: layout.y + i * (layout.h / 4), w: 20, h: layout.h / 4 };
        } else if (rightLots.includes(lotName)) {
            const i = rightLots.indexOf(lotName);
            geom = { x: layout.x + layout.w - 20, y: layout.y + i * (layout.h / 4), w: 20, h: layout.h / 4 };
        } else if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + 20 + i * ((layout.w - 40) / 6), y: layout.y, w: (layout.w - 40) / 6, h: layout.h / 2 };
        }
    } else if (blockId === "C") {
        const layout = BLOCK_LAYOUTS["C"];
        const leftLots = ["1", "2", "3", "4"];
        const topLots = ["5", "6", "7", "8", "9", "10", "11", "12"];
        const rightLots = ["13", "14", "15", "16", "17"];
        
        if (leftLots.includes(lotName)) {
            const i = leftLots.indexOf(lotName);
            geom = { x: layout.x, y: layout.y + i * (layout.h / 4), w: 20, h: layout.h / 4 };
        } else if (rightLots.includes(lotName)) {
            const i = rightLots.indexOf(lotName);
            geom = { x: layout.x + layout.w - 20, y: layout.y + i * (layout.h / 5), w: 20, h: layout.h / 5 };
        } else if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + 20 + i * ((layout.w - 40) / 8), y: layout.y, w: (layout.w - 40) / 8, h: layout.h / 2 };
        }
    } else if (blockId === "D") {
        const layout = BLOCK_LAYOUTS["D"];
        const leftTopLots = ["1", "2", "3", "4"];
        const leftBottomLots = ["23", "24", "25", "26", "27", "28", "29", "30", "31"];
        const topLots = ["5", "6", "7", "8", "9", "10"];
        const rightLots = ["11", "12", "13", "14", "15", "16"];
        const innerLots = ["22", "21", "20", "19", "18", "17"];
        
        if (leftTopLots.includes(lotName)) {
            const i = leftTopLots.indexOf(lotName);
            geom = { x: layout.x, y: layout.y + i * (100 / 4), w: 20, h: 100 / 4 };
        } else if (leftBottomLots.includes(lotName)) {
            const i = leftBottomLots.indexOf(lotName);
            geom = { x: layout.x, y: layout.y + 100 + i * (100 / 9), w: 20, h: 100 / 9 };
        } else if (rightLots.includes(lotName)) {
            const i = rightLots.indexOf(lotName);
            geom = { x: layout.x + layout.w - 20, y: layout.y + i * (100 / 6), w: 20, h: 100 / 6 };
        } else if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + 20 + i * ((layout.w - 40) / 6), y: layout.y, w: (layout.w - 40) / 6, h: 48 };
        } else if (innerLots.includes(lotName)) {
            const i = innerLots.indexOf(lotName);
            geom = { x: layout.x + 20 + i * ((layout.w - 40) / 6), y: layout.y + 48, w: (layout.w - 40) / 6, h: 48 };
        }
    } else if (blockId === "E") {
        const layout = BLOCK_LAYOUTS["E"];
        const topLots = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
        const rightLots = ["12", "13", "14", "15", "16"];
        const bottomLots = ["28", "27", "26", "25", "24", "23", "22", "21", "20", "19", "18", "17"];
        
        if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + i * (layout.w / 11), y: layout.y, w: layout.w / 11, h: layout.h / 2 };
        } else if (rightLots.includes(lotName)) {
            const i = rightLots.indexOf(lotName);
            geom = { x: layout.x + layout.w - 20, y: layout.y + i * (layout.h / 5), w: 20, h: layout.h / 5 };
        } else if (bottomLots.includes(lotName)) {
            const i = bottomLots.indexOf(lotName);
            geom = { x: layout.x + i * (layout.w / 12), y: layout.y + layout.h / 2, w: layout.w / 12, h: layout.h / 2 };
        }
    } else if (blockId === "F") {
        const layout = BLOCK_LAYOUTS["F"];
        const leftLots = ["1", "2", "3", "4", "5", "6"];
        const topLots = ["7", "8", "9", "10", "11", "12", "13", "14"];
        const rightLots = ["15", "16", "17", "18", "19", "20"];
        const bottomLots = ["27", "26", "25", "24", "23", "22", "21"];
        
        if (leftLots.includes(lotName)) {
            const i = leftLots.indexOf(lotName);
            geom = { x: layout.x, y: layout.y + i * (layout.h / 6), w: 20, h: layout.h / 6 };
        } else if (rightLots.includes(lotName)) {
            const i = rightLots.indexOf(lotName);
            geom = { x: layout.x + layout.w - 20, y: layout.y + i * (layout.h / 6), w: 20, h: layout.h / 6 };
        } else if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + 20 + i * ((layout.w - 40) / 8), y: layout.y, w: (layout.w - 40) / 8, h: layout.h / 2 };
        } else if (bottomLots.includes(lotName)) {
            const i = bottomLots.indexOf(lotName);
            geom = { x: layout.x + 20 + i * ((layout.w - 40) / 7), y: layout.y + layout.h / 2, w: (layout.w - 40) / 7, h: layout.h / 2 };
        }
    } else if (blockId === "G") {
        const layout = BLOCK_LAYOUTS["G"];
        const leftLots = ["1", "16", "15", "14", "13", "12"];
        const centerLots = ["2", "3", "11", "10"];
        const rightLots = ["4", "5", "6", "7", "8", "9"];
        
        if (leftLots.includes(lotName)) {
            const i = leftLots.indexOf(lotName);
            geom = { x: layout.x, y: layout.y + i * (layout.h / 6), w: 20, h: layout.h / 6 };
        } else if (rightLots.includes(lotName)) {
            const i = rightLots.indexOf(lotName);
            geom = { x: layout.x + layout.w - 20, y: layout.y + i * (layout.h / 6), w: 20, h: layout.h / 6 };
        } else {
            const i = centerLots.indexOf(lotName);
            const cx = i % 2;
            const cy = Math.floor(i / 2);
            geom = { x: layout.x + 35 + cx * 30, y: layout.y + 15 + cy * 40, w: 25, h: 30 };
        }
    } else if (blockId === "N") {
        const layout = BLOCK_LAYOUTS["N"];
        const topLots = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        const rightLots = ["13", "14", "15", "16", "17", "18"];
        const bottomLots = ["30", "29", "28", "27", "26", "25", "24", "23", "22", "21", "20", "19"];
        
        if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + i * (layout.w / 12), y: layout.y, w: layout.w / 12, h: layout.h / 2 };
        } else if (rightLots.includes(lotName)) {
            const i = rightLots.indexOf(lotName);
            geom = { x: layout.x + layout.w - 20, y: layout.y + i * (layout.h / 6), w: 20, h: layout.h / 6 };
        } else if (bottomLots.includes(lotName)) {
            const i = bottomLots.indexOf(lotName);
            geom = { x: layout.x + i * (layout.w / 12), y: layout.y + layout.h / 2, w: layout.w / 12, h: layout.h / 2 };
        }
    } else if (blockId === "H") {
        const layout = BLOCK_LAYOUTS["H"];
        const leftLots = ["1", "2", "3", "4", "5", "6"];
        const topLots = ["7", "8", "9", "10", "11", "12", "13", "14"];
        const rightLots = ["15", "16", "17", "18", "19", "20"];
        const bottomLots = ["28", "27", "26", "25", "24", "23", "22", "21"];
        
        if (leftLots.includes(lotName)) {
            const i = leftLots.indexOf(lotName);
            geom = { x: layout.x, y: layout.y + i * (layout.h / 6), w: 20, h: layout.h / 6 };
        } else if (rightLots.includes(lotName)) {
            const i = rightLots.indexOf(lotName);
            geom = { x: layout.x + layout.w - 20, y: layout.y + i * (layout.h / 6), w: 20, h: layout.h / 6 };
        } else if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + 20 + i * ((layout.w - 40) / 8), y: layout.y, w: (layout.w - 40) / 8, h: layout.h / 2 };
        } else if (bottomLots.includes(lotName)) {
            const i = bottomLots.indexOf(lotName);
            geom = { x: layout.x + 20 + i * ((layout.w - 40) / 8), y: layout.y + layout.h / 2, w: (layout.w - 40) / 8, h: layout.h / 2 };
        }
    } else if (blockId === "I") {
        const layout = BLOCK_LAYOUTS["I"];
        const topLots = ["2", "3", "4", "5", "6", "7", "8"];
        const leftLots = ["1"];
        const bottomLots = ["12", "11", "10", "9"];
        
        if (leftLots.includes(lotName)) {
            geom = { x: layout.x, y: layout.y, w: 20, h: layout.h };
        } else if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + 20 + i * ((layout.w - 20) / 7), y: layout.y, w: (layout.w - 20) / 7, h: layout.h / 2 };
        } else if (bottomLots.includes(lotName)) {
            const i = bottomLots.indexOf(lotName);
            geom = { x: layout.x + 20 + i * ((layout.w - 20) / 4), y: layout.y + layout.h / 2, w: (layout.w - 20) / 4, h: layout.h / 2 };
        }
    } else if (blockId === "J") {
        const layout = BLOCK_LAYOUTS["J"];
        const topLots = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        const bottomLots = ["20", "19", "18", "17", "16", "15", "14", "13", "12", "11"];
        
        if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + i * (layout.w / 10), y: layout.y, w: layout.w / 10, h: layout.h / 2 };
        } else if (bottomLots.includes(lotName)) {
            const i = bottomLots.indexOf(lotName);
            geom = { x: layout.x + i * (layout.w / 10), y: layout.y + layout.h / 2, w: layout.w / 10, h: layout.h / 2 };
        }
    } else if (blockId === "K") {
        const layout = BLOCK_LAYOUTS["K"];
        const topLots = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        const bottomLots = ["24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13"];
        
        if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + i * (layout.w / 12), y: layout.y, w: layout.w / 12, h: layout.h / 2 };
        } else if (bottomLots.includes(lotName)) {
            const i = bottomLots.indexOf(lotName);
            geom = { x: layout.x + i * (layout.w / 12), y: layout.y + layout.h / 2, w: layout.w / 12, h: layout.h / 2 };
        }
    } else if (blockId === "L") {
        const layout = BLOCK_LAYOUTS["L"];
        if (["1", "2", "3", "4"].includes(lotName)) {
            const i = ["1", "2", "3", "4"].indexOf(lotName);
            geom = { x: layout.x, y: layout.y + i * (layout.h / 4), w: 25, h: layout.h / 4 };
        } else if (["8", "9", "10", "11"].includes(lotName)) {
            const i = ["8", "9", "10", "11"].indexOf(lotName);
            geom = { x: layout.x + layout.w - 25, y: layout.y + i * (layout.h / 4), w: 25, h: layout.h / 4 };
        } else {
            const i = ["5", "6", "7"].indexOf(lotName);
            geom = { x: layout.x + 25, y: layout.y + 15 + i * (layout.h / 4), w: layout.w - 50, h: layout.h / 4 };
        }
    } else if (blockId === "M") {
        const layout = BLOCK_LAYOUTS["M"];
        const topLots = ["1", "2", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
        const bottomLots = ["3", "4", "33", "32", "31", "30", "29", "28", "27", "26", "25", "24", "23"];
        
        if (topLots.includes(lotName)) {
            const i = topLots.indexOf(lotName);
            geom = { x: layout.x + i * (layout.w / 20), y: layout.y, w: layout.w / 20, h: layout.h / 2 };
        } else if (bottomLots.includes(lotName)) {
            const i = bottomLots.indexOf(lotName);
            geom = { x: layout.x + i * (layout.w / 13), y: layout.y + layout.h / 2, w: layout.w / 13, h: layout.h / 2 };
        }
    }
    
    return geom;
}

// Relación de adyacencia de calles con Manzanas (para censo de afectados)
const STREET_MANZANAS_MAPPING = {
    "Dardo Rocha": ["E", "F", "G", "N", "H", "I", "J", "K"],
    "Artemio Moreno": ["I", "J", "K", "L", "M"],
    "Grl. Paz": ["D", "E", "F", "G", "N", "H"],
    "Ascasubi": ["A", "B", "C", "D", "E", "F"],
    "Cesar Carrizo": ["A", "D", "G", "I", "L"],
    "Mármol": ["A", "D"],
    "J. Mármol": ["D", "G"],
    "Tudcum": ["G", "N", "E"],
    "Chamical": ["E", "F", "N", "H"],
    "Portezuelo": ["C", "F", "H", "K", "M"],
    "Calle S/N": ["A", "B", "D", "G", "I", "L"]
};

// Coordenadas Poligonales (no críticas, pero actualizadas a las nuevas manzanas)
const BLOCK_POLYGONS = {
    "A": { points: "15,15 155,15 155,90 15,90", cx: 85, cy: 52, name: "Manzana A" },
    "B": { points: "165,15 365,15 365,90 165,90", cx: 265, cy: 52, name: "Manzana B" },
    "C": { points: "380,15 530,15 530,90 380,90", cx: 455, cy: 52, name: "Manzana C" },
    "D": { points: "15,105 160,105 160,205 15,205", cx: 87, cy: 155, name: "Manzana D" },
    "E": { points: "175,105 365,105 365,205 175,205", cx: 270, cy: 155, name: "Manzana E" },
    "F": { points: "380,105 530,105 530,205 380,205", cx: 455, cy: 155, name: "Manzana F" },
    "G": { points: "15,220 160,220 160,320 15,320", cx: 87, cy: 270, name: "Manzana G" },
    "N": { points: "175,220 365,220 365,320 175,320", cx: 270, cy: 270, name: "Manzana N" },
    "H": { points: "380,220 530,220 530,320 380,320", cx: 455, cy: 270, name: "Manzana H" },
    "I": { points: "15,335 160,335 160,400 15,400", cx: 87, cy: 367, name: "Manzana I" },
    "J": { points: "175,335 365,335 365,400 175,400", cx: 270, cy: 367, name: "Manzana J" },
    "K": { points: "380,335 530,335 530,400 380,400", cx: 455, cy: 367, name: "Manzana K" },
    "L": { points: "15,415 160,415 160,505 15,505", cx: 87, cy: 460, name: "Manzana L" },
    "M": { points: "175,415 530,415 530,505 175,505", cx: 352, cy: 460, name: "Manzana M" }
};

// Layout de la grilla interactiva sobre el mapa satelital plano1.png (546x524)
const BLOCK_LAYOUTS = {
    "A": { x: 7, y: 3, w: 159, h: 99, rows: 2, cols: 7 },
    "B": { x: 152, y: 3, w: 224, h: 99, rows: 0, cols: 0, isCommunity: true },
    "C": { x: 368, y: 3, w: 172, h: 99, rows: 2, cols: 9 },
    "D": { x: 7, y: 93, w: 162, h: 224, rows: 2, cols: 8 },
    "E": { x: 163, y: 93, w: 214, h: 124, rows: 2, cols: 8 },
    "F": { x: 368, y: 93, w: 174, h: 124, rows: 2, cols: 8 },
    "G": { x: 7, y: 208, w: 165, h: 124, rows: 2, cols: 8 },
    "N": { x: 163, y: 208, w: 214, h: 124, rows: 2, cols: 8 },
    "H": { x: 368, y: 208, w: 174, h: 124, rows: 2, cols: 8 },
    "I": { x: 7, y: 323, w: 165, h: 88, rows: 2, cols: 6 },
    "J": { x: 163, y: 328, w: 214, h: 83, rows: 2, cols: 10 },
    "K": { x: 368, y: 323, w: 174, h: 88, rows: 2, cols: 12 },
    "L": { x: 6, y: 403, w: 165, h: 113, rows: 2, cols: 6 },
    "M": { x: 165, y: 403, w: 377, h: 100, rows: 2, cols: 16 }
};

// Base de Datos Inicial de Luminarias (según puntos verdes y rojos de la imagen)
const INITIAL_LUMINAIRES = [
    // Calle Ascasubi (y=97)
    { id: "LUM-ASCASUBI-01", street: "Ascasubi", x: 45, y: 97, status: "green" },
    { id: "LUM-ASCASUBI-02", street: "Ascasubi", x: 145, y: 97, status: "green" },
    { id: "LUM-ASCASUBI-03", street: "Ascasubi", x: 230, y: 97, status: "green" },
    { id: "LUM-ASCASUBI-04", street: "Ascasubi", x: 345, y: 97, status: "green" },
    { id: "LUM-ASCASUBI-05", street: "Ascasubi", x: 415, y: 97, status: "red" }, // QUEMADA CERCANA A C/F
    { id: "LUM-ASCASUBI-06", street: "Ascasubi", x: 490, y: 97, status: "green" },
    
    // Calle GRL Paz (y=212)
    { id: "LUM-GPAZ-01", street: "Grl. Paz", x: 115, y: 212, status: "green" },
    { id: "LUM-GPAZ-02", street: "Grl. Paz", x: 295, y: 212, status: "green" },
    { id: "LUM-GPAZ-03", street: "Grl. Paz", x: 430, y: 212, status: "green" },
    
    // Calle Dardo Rocha (y=327)
    { id: "LUM-DROCHA-01", street: "Dardo Rocha", x: 70, y: 327, status: "green" },
    { id: "LUM-DROCHA-02", street: "Dardo Rocha", x: 240, y: 327, status: "green" },
    { id: "LUM-DROCHA-03", street: "Dardo Rocha", x: 390, y: 327, status: "green" },
    
    // Calle Artemio Moreno (y=407)
    { id: "LUM-AMORENO-01", street: "Artemio Moreno", x: 65, y: 407, status: "red" }, // QUEMADA ENTRE I y L
    { id: "LUM-AMORENO-02", street: "Artemio Moreno", x: 190, y: 407, status: "green" },
    { id: "LUM-AMORENO-03", street: "Artemio Moreno", x: 320, y: 407, status: "green" },
    { id: "LUM-AMORENO-04", street: "Artemio Moreno", x: 455, y: 407, status: "green" },

    // Verticales y otras calles
    { id: "LUM-MARMOL-01", street: "Mármol", x: 65, y: 265, status: "green" },
    { id: "LUM-TUDCUM-01", street: "Tudcum", x: 175, y: 240, status: "green" },
    { id: "LUM-CHAMICAL-01", street: "Chamical", x: 380, y: 140, status: "green" },
    { id: "LUM-PORTEZUELO-01", street: "Portezuelo", x: 505, y: 310, status: "green" },
    { id: "LUM-CALLESN-01", street: "Calle S/N", x: 15, y: 300, status: "green" }
];

// Censo Inicial Pre-cargado con Letras de Manzana
const INITIAL_CENSUS = [
    { dni: "28.456.789", name: "María Elena González", phone: "3804-123456", manzana: "M", lote: "33", priorities: { elderly: true, children: false, disability: false } },
    { dni: "32.987.654", name: "Carlos Alberto Díaz", phone: "3804-987654", manzana: "E", lote: "18", priorities: { elderly: false, children: true, disability: false } },
    { dni: "35.123.456", name: "Ana Beatríz Romero", phone: "3804-123321", manzana: "C", lote: "12", priorities: { elderly: false, children: false, disability: true } },
    { dni: "42.555.666", name: "Esteban Sosa", phone: "3804-334455", manzana: "A", lote: "10", priorities: { elderly: false, children: true, disability: false } },
    { dni: "30.222.333", name: "Patricia Mercado", phone: "3804-998877", manzana: "F", lote: "12", priorities: { elderly: false, children: false, disability: false } },
    { dni: "25.777.888", name: "Ramón Castro", phone: "3804-112233", manzana: "I", lote: "6", priorities: { elderly: true, children: false, disability: false } },
    { dni: "39.444.555", name: "Laura Toledo", phone: "3804-887766", manzana: "G", lote: "15", priorities: { elderly: false, children: true, disability: false } },
    { dni: "44.111.222", name: "Sofía Luna", phone: "3804-776655", manzana: "K", lote: "20", priorities: { elderly: false, children: false, disability: true } }
];

// Reclamos Iniciales Pre-cargados
const INITIAL_RECLAMOS = [
    {
        id: "REC-2026-0001",
        date: "2026-05-25",
        neighborDni: "32.987.654",
        neighborName: "Carlos Alberto Díaz",
        category: "luminaria",
        luminaireId: "LUM-ASCASUBI-05",
        manzana: "E",
        lote: "18",
        street: "Ascasubi",
        description: "La luminaria de la cuadra está apagada hace tres noches. Es un peligro porque hay adultos mayores viviendo cerca.",
        status: "active"
    },
    {
        id: "REC-2026-0002",
        date: "2026-05-24",
        neighborDni: "35.123.456",
        neighborName: "Ana Beatríz Romero",
        category: "basura",
        luminaireId: "",
        manzana: "C",
        lote: "12",
        street: "Artemio Moreno",
        description: "Se ha acumulado un microbasural con escombros y desperdicios orgánicos en el terreno lindero. Ya hay presencia de roedores.",
        status: "active"
    },
    {
        id: "REC-2026-0003",
        date: "2026-05-26",
        neighborDni: "44.111.222",
        neighborName: "Sofía Luna",
        category: "agua",
        luminaireId: "",
        manzana: "K",
        lote: "20",
        street: "Cesar Carrizo",
        description: "Hay una importante pérdida de agua corriente sobre la calzada que inunda las veredas y dificulta el paso de peatones.",
        status: "active"
    }
];

// Limpieza automática de LocalStorage antiguo si tiene el formato "M-" o no tiene la marca de geometría exacta v5
const isOldData = (localStorage.getItem("cv_census") && localStorage.getItem("cv_census").includes('"manzana":"M-')) || !localStorage.getItem("cv_geometry_v5");
if (isOldData) {
    localStorage.removeItem("cv_census");
    localStorage.removeItem("cv_reclamos");
    localStorage.removeItem("cv_luminaires");
    localStorage.removeItem("cv_custom_lot_geometries");
    localStorage.setItem("cv_geometry_v5", "true");
}

// Variables de Estado
let database = {
    census: JSON.parse(localStorage.getItem("cv_census")) || INITIAL_CENSUS,
    reclamos: JSON.parse(localStorage.getItem("cv_reclamos")) || INITIAL_RECLAMOS,
    luminaires: JSON.parse(localStorage.getItem("cv_luminaires")) || [],
    customLotGeometries: JSON.parse(localStorage.getItem("cv_custom_lot_geometries")) || {}
};

// Cargar o actualizar luminarias si son antiguas o está vacío
const needsUpdate = database.luminaires.length === 0 || 
                     database.luminaires.some(l => l.id === "LUM-ASCASUBI-01" && l.x === 24);

if (needsUpdate && INITIAL_LUMINAIRES.length > 0) {
    database.luminaires = [...INITIAL_LUMINAIRES];
    localStorage.setItem("cv_luminaires", JSON.stringify(database.luminaires));
}

let currentRole = "neighbor";
let isEditMode = false;
let isLotEditMode = false;
let tempLotGeom = null;
let clickCoords = { x: 0, y: 0 };
let selectedLuminaireId = null;
let selectedBlockId = null;
let selectedLotName = null;
let activeIncidentTool = null;
let editingCensusIndex = null;
let selectedIncidentId = null;

// Inicialización de la Aplicación
document.addEventListener("DOMContentLoaded", () => {
    initClock();
    populateCensusDropdowns();
    renderMapSVG();
    updateStats();
    populateNeighborDropdown();
    renderClaimsTable();
    renderCensusTable();
    
    document.getElementById("new-lum-street").addEventListener("change", suggestLuminaireID);
    
    lucide.createIcons();
    
    // Registrar Service Worker para PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('Service Worker registrado con éxito:', reg.scope))
                .catch(err => console.error('Error al registrar el Service Worker:', err));
        });
    }
});

// Reloj en tiempo real
function initClock() {
    const clockEl = document.getElementById("current-time");
    const updateTime = () => {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false
        };
        clockEl.textContent = now.toLocaleDateString('es-AR', options);
    };
    updateTime();
    setInterval(updateTime, 1000);
}

// Persistencia de la Base de Datos
function saveDatabase() {
    localStorage.setItem("cv_census", JSON.stringify(database.census));
    localStorage.setItem("cv_reclamos", JSON.stringify(database.reclamos));
    localStorage.setItem("cv_luminaires", JSON.stringify(database.luminaires));
    localStorage.setItem("cv_custom_lot_geometries", JSON.stringify(database.customLotGeometries || {}));
    updateStats();
    populateNeighborDropdown();
}

// Alternar entre Roles
function switchRole(role) {
    if (role === "admin") {
        const pwd = prompt("Ingrese la contraseña de Administrador:");
        if (pwd !== "28599255") {
            alert("Contraseña incorrecta. Acceso denegado.");
            document.getElementById("btn-mode-neighbor").classList.add("active");
            document.getElementById("btn-mode-admin").classList.remove("active");
            return;
        }
    }
    
    currentRole = role;
    
    document.getElementById("btn-mode-neighbor").classList.toggle("active", role === "neighbor");
    document.getElementById("btn-mode-admin").classList.toggle("active", role === "admin");
    
    document.getElementById("panel-neighbor").classList.toggle("active", role === "neighbor");
    document.getElementById("panel-admin").classList.toggle("active", role === "admin");
    
    if (isEditMode) toggleEditMode();
    closeLuminaireFloat();
    deselectBlock();
    
    if (role === "admin") {
        renderClaimsTable();
        updateStats();
    } else {
        populateNeighborDropdown();
        renderMapSVG();
    }
}

// Activar/Desactivar Modo de Ubicación de Luces (Solo Admin)
function toggleEditMode() {
    if (currentRole !== "admin") return;
    
    isEditMode = !isEditMode;
    
    const btn = document.getElementById("btn-toggle-edit-mode");
    const label = document.getElementById("edit-mode-label");
    const mapWrapper = document.getElementById("map-svg-wrapper");
    const hintLabel = document.getElementById("map-hint-label");
    
    btn.classList.toggle("active", isEditMode);
    
    if (isEditMode) {
        label.textContent = "Modo Ubicación Activo (Clic en Mapa)";
        mapWrapper.classList.add("edit-mode-active");
        hintLabel.innerHTML = "<strong style='color: var(--color-green);'>MODO UBICACIÓN DE LUCES ACTIVO:</strong> Haga clic en cualquier calle sobre el mapa para colocar un poste.";
        closeLuminaireFloat();
        deselectBlock();
    } else {
        label.textContent = "Activar Ubicación de Luces";
        mapWrapper.classList.remove("edit-mode-active");
        hintLabel.textContent = "Haga clic en un Lote (cuadrícula) para registrar/ver el censo, o en una Luminaria para ver reportes.";
    }
    
    lucide.createIcons();
}

// Llenado de dropdowns iniciales
function populateCensusDropdowns() {
    const reportMz = document.getElementById("report-manzana");
    reportMz.innerHTML = '<option value="">Opcional (Manzana)...</option>';
    
    const censusMz = document.getElementById("census-manzana");
    if (censusMz) {
        censusMz.innerHTML = '<option value="">Seleccionar Manzana...</option>';
    }
    
    Object.keys(MANZANAS_DATA).forEach(mz => {
        const opt = document.createElement("option");
        opt.value = mz;
        opt.textContent = `Manzana ${mz}`;
        reportMz.appendChild(opt.cloneNode(true));
        
        if (censusMz) {
            const opt2 = document.createElement("option");
            opt2.value = mz;
            opt2.textContent = `Manzana ${mz}`;
            censusMz.appendChild(opt2);
        }
    });
}

function updateLotesDropdown(manzanaSelectId, loteSelectId) {
    const mzSelect = document.getElementById(manzanaSelectId);
    const loteSelect = document.getElementById(loteSelectId);
    const selectedMz = mzSelect.value;
    
    loteSelect.innerHTML = '<option value="">Seleccionar Lote...</option>';
    
    if (selectedMz && MANZANAS_DATA[selectedMz]) {
        MANZANAS_DATA[selectedMz].forEach(lote => {
            const opt = document.createElement("option");
            opt.value = lote;
            opt.textContent = `Lote ${lote}`;
            loteSelect.appendChild(opt);
        });
    } else {
        loteSelect.innerHTML = '<option value="">Elija Manzana primero</option>';
    }
}

function populateNeighborDropdown() {
    const select = document.getElementById("report-neighbor");
    select.innerHTML = '<option value="">Seleccione vecino registrado...</option>';
    
    // Add Admin direct report option
    const optAdmin = document.createElement("option");
    optAdmin.value = "ADMIN";
    optAdmin.textContent = "⚙️ REGISTRO DIRECTO - Centro Vecinal (Sin vecino)";
    select.appendChild(optAdmin);
    
    database.census.forEach(v => {
        const opt = document.createElement("option");
        opt.value = v.dni;
        opt.textContent = `${v.name} (DNI ${v.dni} - Mz ${v.manzana} Lote ${v.lote})`;
        select.appendChild(opt);
    });
}

function handleReportNeighborChange() {
    const dni = document.getElementById("report-neighbor").value;
    if (dni === "ADMIN") {
        document.getElementById("report-manzana").value = "";
        document.getElementById("report-lote").value = "";
        document.getElementById("report-street").value = "";
        return;
    }
    const vecino = database.census.find(v => v.dni === dni);
    
    if (vecino) {
        document.getElementById("report-manzana").value = vecino.manzana;
        updateLotesDropdown("report-manzana", "report-lote");
        document.getElementById("report-lote").value = vecino.lote;
        
        const street = getManzanaStreet(vecino.manzana);
        if (street) {
            document.getElementById("report-street").value = street;
        }
    }
}

function handleReportCategoryChange() {
    const cat = document.getElementById("report-category").value;
    const lumSelect = document.getElementById("group-luminaria-select");
    
    // Alumbrado publico now behaves like other incidents (dynamic click placement)
    if (lumSelect) {
        lumSelect.classList.add("hidden");
    }
}

function populateLuminairesDropdown() {
    const select = document.getElementById("report-luminaria-id");
    select.innerHTML = '<option value="">Seleccione poste de luz...</option>';
    
    database.luminaires.forEach(lum => {
        const opt = document.createElement("option");
        opt.value = lum.id;
        opt.textContent = `${lum.id} - Calle ${lum.street} [${lum.status === "green" ? "🟢 Activa" : "🔴 Apagada"}]`;
        select.appendChild(opt);
    });
}

// RENDERIZAR MAPA SVG (Cropped a 546x524)
function renderMapSVG() {
    const wrapper = document.getElementById("map-svg-wrapper");
    const filterEl = document.getElementById("filter-claims-category");
    const filterCat = (currentRole === "admin" && filterEl) ? filterEl.value : "all";
    
    let svgHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 546 524" width="100%" height="100%" id="main-neighborhood-svg" onclick="handleMapClick(event)">
        <!-- Fondo: Imagen del plano limpio alineado -->
        <image href="plano1.png" x="0" y="-16" width="546" height="540" preserveAspectRatio="none" />
        
        <!-- Marcadores de incidentes dinámicos reportados por los vecinos -->
        <g id="svg-incidents">
    `;

    const categoryEmojis = {
        "luminaria": "💡",
        "bache": "🕳️",
        "agua": "💧",
        "basura": "🗑️",
        "tension": "⚡"
    };

    database.reclamos.forEach(rec => {
        if (rec.status === "active" && rec.x !== undefined && rec.y !== undefined) {
            if (filterCat !== "all" && rec.category !== filterCat) {
                return;
            }
            if (rec.category === "luminaria") {
                const isSelectedGlow = selectedIncidentId === rec.id ? "filter: drop-shadow(0 0 6px #3b82f6) drop-shadow(0 0 6px #ef4444);" : "filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.5));";
                svgHtml += `
                    <g class="svg-marker-group" onclick="event.stopPropagation(); selectIncident('${rec.id}')" style="cursor: pointer; ${isSelectedGlow}">
                        <circle cx="${rec.x}" cy="${rec.y}" r="9" fill="#ef4444" stroke="#ffffff" stroke-width="1.2" />
                        <path d="M ${rec.x-3} ${rec.y-2.5} c 0 -2.2, 6 -2.2, 6 0 c 0 1.5, -1.5 2.2, -1.5 3.7 h -3 c 0 -1.5, -1.5 -2.2, -1.5 -3.7 z M ${rec.x-1.5} ${rec.y+2.5} h 3 v 0.7 h -3 z" fill="#ffffff" />
                    </g>
                `;
            } else {
                const emoji = categoryEmojis[rec.category] || "❓";
                const isSelectedGlow = selectedIncidentId === rec.id ? "filter: drop-shadow(0 0 5px #3b82f6); font-size: 20px;" : "font-size: 16px;";
                svgHtml += `
                    <g class="svg-marker-group" onclick="event.stopPropagation(); selectIncident('${rec.id}')" style="cursor: pointer;">
                        <text x="${rec.x}" y="${rec.y}" class="svg-marker-icon" text-anchor="middle" dominant-baseline="central" style="${isSelectedGlow}">${emoji}</text>
                    </g>
                `;
            }
        }
    });

    svgHtml += `
        </g>
    </svg>
    `;

    wrapper.innerHTML = svgHtml;
}

// Capturar Clic en el Mapa
function handleMapClick(event) {
    const svg = document.getElementById("main-neighborhood-svg");
    if (!svg) return;
    
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    const x = Math.round(svgP.x);
    const y = Math.round(svgP.y);

    if (isEditMode) {
        clickCoords.x = x;
        clickCoords.y = y;
        openAddLuminaireModal(x, y);
    } else if (activeIncidentTool) {
        if (currentRole === "admin") {
            // Register incident immediately for admin without forms or alerts
            const newId = `REC-2026-${(database.reclamos.length + 1).toString().padStart(4, '0')}`;
            const catLabels = {
                "luminaria": "Luz Quemada / Falla de Alumbrado Público",
                "bache": "Bache / Pozo en la calzada",
                "agua": "Pérdida de agua corriente",
                "basura": "Acumulación de residuos / microbasural",
                "tension": "Cables sueltos o riesgo eléctrico"
            };
            const label = catLabels[activeIncidentTool] || activeIncidentTool;
            
            const newReport = {
                id: newId,
                date: new Date().toISOString().split('T')[0],
                neighborDni: "ADMIN",
                neighborName: "Centro Vecinal (Administración)",
                category: activeIncidentTool,
                luminaireId: "",
                manzana: "",
                lote: "",
                street: "Vía Pública",
                description: `${label} registrado en mapa por el Administrador.`,
                status: "active",
                x: x,
                y: y
            };
            
            database.reclamos.push(newReport);
            saveDatabase();
            renderMapSVG();
            renderClaimsTable();
            
            // Reset tool selection
            selectIncidentTool(null);
        } else {
            // Neighbor flow: switch role, fill form and alert
            switchRole('neighbor');
            
            document.getElementById("report-category").value = activeIncidentTool;
            handleReportCategoryChange();
            
            clickCoords.x = x;
            clickCoords.y = y;
            
            const catLabels = {
                "luminaria": "Luz Quemada / Falla de Alumbrado Público",
                "bache": "Bache / Pozo en la calzada",
                "agua": "Pérdida de agua corriente",
                "basura": "Acumulación de residuos / microbasural",
                "tension": "Cables sueltos o riesgo eléctrico"
            };
            const label = catLabels[activeIncidentTool] || activeIncidentTool;
            document.getElementById("report-description").value = `${label} detectado en el plano de catastro.`;
            document.getElementById("report-description").focus();
            
            document.getElementById("report-form").scrollIntoView({ behavior: 'smooth' });
            
            alert(`Ubicación seleccionada (${x}, ${y}) para reportar ${label}. Complete los detalles en el formulario de la izquierda.`);
            
            // Reset tool selection
            selectIncidentTool(null);
        }
    }
}

// Abrir Modal de Creación
function openAddLuminaireModal(x, y) {
    document.getElementById("new-lum-x").value = x;
    document.getElementById("new-lum-y").value = y;
    document.getElementById("new-lum-id").value = "";
    document.getElementById("new-lum-street").value = "";
    
    document.getElementById("modal-add-luminaire").classList.remove("hidden");
}

function closeAddLuminaireModal() {
    document.getElementById("modal-add-luminaire").classList.add("hidden");
}

function suggestLuminaireID() {
    const street = document.getElementById("new-lum-street").value;
    const input = document.getElementById("new-lum-id");
    
    if (!street) {
        input.value = "";
        return;
    }
    
    const streetMap = {
        "Dardo Rocha": "DROCHA",
        "Artemio Moreno": "AMORENO",
        "Mármol": "MARMOL",
        "Grl. Paz": "GPAZ",
        "Ascasubi": "ASCASUBI",
        "Chamical": "CHAMICAL",
        "Tudcum": "TUDCUM",
        "Portezuelo": "PORTEZUELO",
        "Cesar Carrizo": "CCARRIZO",
        "Calle S/N": "CALLESN"
    };
    
    const code = streetMap[street] || "STREET";
    const count = database.luminaires.filter(l => l.street === street).length;
    const nextNum = (count + 1).toString().padStart(2, '0');
    
    input.value = `LUM-${code}-${nextNum}`;
}

function saveNewLuminaire() {
    const x = parseInt(document.getElementById("new-lum-x").value);
    const y = parseInt(document.getElementById("new-lum-y").value);
    const id = document.getElementById("new-lum-id").value.trim().toUpperCase();
    const street = document.getElementById("new-lum-street").value;
    
    if (!id || !street) {
        alert("Por favor complete todos los campos.");
        return;
    }
    
    if (database.luminaires.some(l => l.id === id)) {
        alert("Ya existe un poste registrado con ese ID único.");
        return;
    }
    
    const newLum = { id, street, x, y, status: "green", custom: true };
    database.luminaires.push(newLum);
    
    saveDatabase();
    closeAddLuminaireModal();
    renderMapSVG();
    
    alert(`Poste ${id} guardado con éxito.`);
}

function deleteLuminaire(lumId) {
    if (!confirm(`¿Desea eliminar definitivamente la luminaria ${lumId}?`)) return;
    
    database.luminaires = database.luminaires.filter(l => l.id !== lumId);
    
    const reports = database.reclamos.filter(r => r.luminaireId === lumId);
    reports.forEach(r => r.status = "resolved");
    
    saveDatabase();
    closeLuminaireFloat();
    renderMapSVG();
    renderClaimsTable();
}

function clearAllLuminaires() {
    if (!confirm("¿Está seguro de que desea eliminar todas las luminarias del mapa y vaciar el inventario por completo? Esta acción no se puede deshacer.")) return;
    
    database.luminaires = [];
    // Resolver reclamos activos asociados a luminarias
    const reports = database.reclamos.filter(r => r.category === "luminaria");
    reports.forEach(r => r.status = "resolved");
    
    saveDatabase();
    closeLuminaireFloat();
    renderMapSVG();
    renderClaimsTable();
    
    alert("Todo el inventario de alumbrado público ha sido eliminado. Ahora puedes ubicar los postes manualmente desde cero.");
}

// MÓDULO CENSO DE LOTES (GRID CATASTRAL INTERACTIVO)
function selectBlock(blockId) {
    if (isEditMode) return;
    
    selectedBlockId = blockId;
    const current = document.getElementById(`block-${blockId}`);
    if (current) current.classList.add("active");
    
    // Abrir Modal de Censo
    document.getElementById("modal-manzana-census").classList.remove("hidden");
    document.getElementById("modal-census-mz-title").textContent = `Relevamiento Catastral: Manzana ${blockId}`;
    
    // Cargar Grilla de Lotes
    loadLotsGrid(blockId);
    
    // Limpiar columna derecha
    document.getElementById("lot-census-details-column").innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-size: 0.85rem; text-align: center; gap: 8px;">
            <i data-lucide="info" style="width: 24px; height: 24px;"></i>
            <span>Haga clic en un casillero de lote a la izquierda para cargar o ver el relevamiento vecinal.</span>
        </div>
    `;
    lucide.createIcons();
}

function selectLotFromMap(blockId, lotName) {
    if (isEditMode) return;
    
    selectedBlockId = blockId;
    selectedLotName = lotName;
    
    // Renderizar mapa para reflejar el estado activo
    renderMapSVG();
    
    // Abrir Modal de Censo
    document.getElementById("modal-manzana-census").classList.remove("hidden");
    document.getElementById("modal-census-mz-title").textContent = `Relevamiento Catastral: Manzana ${blockId}`;
    
    // Cargar Grilla de Lotes en el modal
    loadLotsGrid(blockId);
    
    // Seleccionar y cargar la ficha del lote en el modal
    selectLot(blockId, lotName);
}

function closeManzanaCensusModal() {
    document.getElementById("modal-manzana-census").classList.add("hidden");
    deselectBlock();
    renderMapSVG(); // Recalcula colores de densidad en el mapa
}

// Cargar la grilla de lotes de la manzana seleccionada
function loadLotsGrid(blockId) {
    const container = document.getElementById("modal-lots-grid-container");
    container.innerHTML = "";
    
    const lots = MANZANAS_DATA[blockId] || [];
    
    lots.forEach(lotName => {
        const isCensado = database.census.some(v => v.manzana === blockId && v.lote === lotName);
        const div = document.createElement("div");
        div.className = `lot-square ${isCensado ? 'censado' : ''} ${selectedLotName === lotName ? 'active' : ''}`;
        div.id = `lot-square-${lotName}`;
        div.textContent = lotName;
        div.onclick = () => selectLot(blockId, lotName);
        container.appendChild(div);
    });
}

// Seleccionar Lote e instanciar detalles/formulario
function selectLot(blockId, lotName) {
    // Cambiar clase active en la grilla
    const activeSquares = document.querySelectorAll(".lot-square.active");
    activeSquares.forEach(sq => sq.classList.remove("active"));
    
    selectedLotName = lotName;
    const lotSquare = document.getElementById(`lot-square-${lotName}`);
    if (lotSquare) lotSquare.classList.add("active");
    
    const detailsCol = document.getElementById("lot-census-details-column");
    
    // Buscar registro de censo
    const record = database.census.find(v => v.manzana === blockId && v.lote === lotName);
    
    if (record) {
        // MOSTRAR DETALLES CENSADOS
        let prioritiesHtml = "";
        if (record.priorities.elderly) prioritiesHtml += `<span class="p-badge elderly"><i data-lucide="heart" class="p-icon"></i> Adulto Mayor</span> `;
        if (record.priorities.children) prioritiesHtml += `<span class="p-badge children"><i data-lucide="smile" class="p-icon"></i> Niños</span> `;
        if (record.priorities.disability) prioritiesHtml += `<span class="p-badge disability"><i data-lucide="accessibility" class="p-icon"></i> Discapacidad</span> `;
        if (!prioritiesHtml) prioritiesHtml = `<span style="color: var(--text-muted);">Sin prioridades de vulnerabilidad</span>`;
        
        detailsCol.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="border-bottom: 1px dashed var(--border-color); padding-bottom: 8px;">
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff;">Lote ${lotName} (Censado)</h4>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">Manzana ${blockId}</span>
                </div>
                
                <div style="font-size: 0.85rem; display: flex; flex-direction: column; gap: 6px;">
                    <p><strong>Nombre:</strong> <span style="color: var(--text-primary);">${record.name}</span></p>
                    <p><strong>D.N.I.:</strong> <span style="color: var(--text-primary);">${record.dni}</span></p>
                    <p><strong>WhatsApp:</strong> <span style="color: var(--text-primary);">${record.phone}</span></p>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    <label>Condiciones Prioritarias</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
                        ${prioritiesHtml}
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
                    <button class="submit-btn bg-blue" onclick="editCensusFromModal('${blockId}', '${lotName}')" style="padding: 8px 12px; font-size: 0.8rem;">
                        <i data-lucide="edit" class="btn-icon"></i> Editar Ficha
                    </button>
                    <button class="submit-btn" onclick="deleteCensusFromModal('${blockId}', '${lotName}')" style="padding: 8px 12px; font-size: 0.8rem; background: var(--color-red-bg); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171;">
                        <i data-lucide="trash-2" class="btn-icon"></i> Borrar Registro
                    </button>
                    <button class="submit-btn bg-amber" onclick="reportFromLot('${blockId}', '${lotName}')" style="padding: 8px 12px; font-size: 0.8rem;">
                        <i data-lucide="alert-triangle" class="btn-icon"></i> Crear Reclamo desde Lote
                    </button>
                </div>
            </div>
        `;
    } else {
        // MOSTRAR FORMULARIO DE RELEVAMIENTO (NUEVO REGISTRO)
        detailsCol.innerHTML = `
            <form onsubmit="submitCensusFromModal(event, '${blockId}', '${lotName}')" style="gap: 12px;">
                <div style="border-bottom: 1px dashed var(--border-color); padding-bottom: 8px;">
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-blue);">Relevamiento de Lote ${lotName}</h4>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">Manzana ${blockId}</span>
                </div>
                
                <div class="form-group">
                    <label for="modal-c-name">Nombre del Vecino</label>
                    <input type="text" id="modal-c-name" required placeholder="Ej: Juan Pérez" style="padding: 8px 10px; font-size: 0.85rem;">
                </div>
                
                <div class="form-row-2">
                    <div class="form-group">
                        <label for="modal-c-dni">D.N.I.</label>
                        <input type="text" id="modal-c-dni" required placeholder="Ej: 35.123.456" style="padding: 8px 10px; font-size: 0.85rem;">
                    </div>
                    <div class="form-group">
                        <label for="modal-c-phone">WhatsApp</label>
                        <input type="tel" id="modal-c-phone" required placeholder="3804-556677" style="padding: 8px 10px; font-size: 0.85rem;">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="section-label" style="font-size: 0.75rem;">Atención Prioritaria</label>
                    <div class="checkbox-options" style="gap: 6px; margin-top: 2px;">
                        <label class="custom-checkbox" style="font-size: 0.8rem; min-height: 18px;">
                            <input type="checkbox" id="modal-c-elderly">
                            <span class="checkmark" style="height: 18px; width: 18px;"></span>
                            <span>Adulto Mayor (60+)</span>
                        </label>
                        <label class="custom-checkbox" style="font-size: 0.8rem; min-height: 18px;">
                            <input type="checkbox" id="modal-c-children">
                            <span class="checkmark" style="height: 18px; width: 18px;"></span>
                            <span>Niños menores (12)</span>
                        </label>
                        <label class="custom-checkbox" style="font-size: 0.8rem; min-height: 18px;">
                            <input type="checkbox" id="modal-c-disability">
                            <span class="checkmark" style="height: 18px; width: 18px;"></span>
                            <span>Discapacidad / Movilidad</span>
                        </label>
                    </div>
                </div>
                
                <button type="submit" class="submit-btn bg-blue" style="padding: 10px 14px; font-size: 0.85rem; margin-top: 6px; width: 100%;">
                    <i data-lucide="save" class="btn-icon"></i> Guardar Relevamiento
                </button>
            </form>
        `;
    }
    
    lucide.createIcons();
}

// Guardar censo desde modal
function submitCensusFromModal(event, blockId, lotName, isEditing = false) {
    if (event) event.preventDefault();
    
    const name = document.getElementById("modal-c-name").value.trim();
    const DNI = document.getElementById("modal-c-dni").value.trim();
    const phone = document.getElementById("modal-c-phone").value.trim();
    
    // Si no está editando, validar DNI duplicado
    if (!isEditing && database.census.some(v => v.dni === DNI)) {
        alert("Ya existe un vecino registrado con este DNI.");
        return;
    }
    
    const priorities = {
        elderly: document.getElementById("modal-c-elderly").checked,
        children: document.getElementById("modal-c-children").checked,
        disability: document.getElementById("modal-c-disability").checked
    };
    
    if (isEditing) {
        // Modificar existente
        const index = database.census.findIndex(v => v.manzana === blockId && v.lote === lotName);
        if (index !== -1) {
            database.census[index] = { dni: DNI, name, phone, manzana: blockId, lote: lotName, priorities };
        }
    } else {
        // Añadir nuevo
        database.census.push({ dni: DNI, name, phone, manzana: blockId, lote: lotName, priorities });
    }
    
    saveDatabase();
    loadLotsGrid(blockId);
    selectLot(blockId, lotName);
}

// Cargar formulario prellenado para editar ficha
function editCensusFromModal(blockId, lotName) {
    const record = database.census.find(v => v.manzana === blockId && v.lote === lotName);
    if (!record) return;
    
    const detailsCol = document.getElementById("lot-census-details-column");
    detailsCol.innerHTML = `
        <form onsubmit="saveEditedCensus(event, '${blockId}', '${lotName}')" style="gap: 12px;">
            <div style="border-bottom: 1px dashed var(--border-color); padding-bottom: 8px;">
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-amber);">Editar Ficha Lote ${lotName}</h4>
                <span style="font-size: 0.75rem; color: var(--text-secondary);">Manzana ${blockId}</span>
            </div>
            
            <div class="form-group">
                <label for="modal-c-name">Nombre del Vecino</label>
                <input type="text" id="modal-c-name" value="${record.name}" required style="padding: 8px 10px; font-size: 0.85rem;">
            </div>
            
            <div class="form-row-2">
                <div class="form-group">
                    <label for="modal-c-dni">D.N.I.</label>
                    <input type="text" id="modal-c-dni" value="${record.dni}" required style="padding: 8px 10px; font-size: 0.85rem;">
                </div>
                <div class="form-group">
                    <label for="modal-c-phone">WhatsApp</label>
                    <input type="tel" id="modal-c-phone" value="${record.phone}" required style="padding: 8px 10px; font-size: 0.85rem;">
                </div>
            </div>
            
            <div class="form-group">
                <label class="section-label" style="font-size: 0.75rem;">Atención Prioritaria</label>
                <div class="checkbox-options" style="gap: 6px; margin-top: 2px;">
                    <label class="custom-checkbox" style="font-size: 0.8rem; min-height: 18px;">
                        <input type="checkbox" id="modal-c-elderly" ${record.priorities.elderly ? 'checked' : ''}>
                        <span class="checkmark" style="height: 18px; width: 18px;"></span>
                        <span>Adulto Mayor (60+)</span>
                    </label>
                    <label class="custom-checkbox" style="font-size: 0.8rem; min-height: 18px;">
                        <input type="checkbox" id="modal-c-children" ${record.priorities.children ? 'checked' : ''}>
                        <span class="checkmark" style="height: 18px; width: 18px;"></span>
                        <span>Niños menores (12)</span>
                    </label>
                    <label class="custom-checkbox" style="font-size: 0.8rem; min-height: 18px;">
                        <input type="checkbox" id="modal-c-disability" ${record.priorities.disability ? 'checked' : ''}>
                        <span class="checkmark" style="height: 18px; width: 18px;"></span>
                        <span>Discapacidad / Movilidad</span>
                    </label>
                </div>
            </div>
            
            <div style="display: flex; gap: 8px; margin-top: 6px;">
                <button type="button" class="submit-btn" onclick="selectLot('${blockId}', '${lotName}')" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: var(--text-secondary); flex: 1; padding: 8px;">Cancelar</button>
                <button type="submit" class="submit-btn bg-blue" style="flex: 2; padding: 8px;">Guardar Cambios</button>
            </div>
        </form>
    `;
    
    lucide.createIcons();
}

function saveEditedCensus(event, blockId, lotName) {
    submitCensusFromModal(event, blockId, lotName, true);
}

// Borrar censo
function deleteCensusFromModal(blockId, lotName) {
    if (!confirm(`¿Está seguro que desea borrar la información censal del lote ${lotName} de la Manzana ${blockId}?`)) {
        return;
    }
    
    database.census = database.census.filter(v => !(v.manzana === blockId && v.lote === lotName));
    saveDatabase();
    
    selectedLotName = null;
    loadLotsGrid(blockId);
    
    document.getElementById("lot-census-details-column").innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-size: 0.85rem; text-align: center;">
            Ficha borrada. Haga clic en otro lote para operar.
        </div>
    `;
}

// Derivar censo a formulario de reclamos de vecinos
function reportFromLot(blockId, lotName) {
    const record = database.census.find(v => v.manzana === blockId && v.lote === lotName);
    if (!record) return;
    
    // Cerrar modal
    document.getElementById("modal-manzana-census").classList.add("hidden");
    deselectBlock();
    
    // Cambiar a rol vecino por si acaso
    switchRole('neighbor');
    
    // Seleccionar vecino informante en el dropdown
    document.getElementById("report-neighbor").value = record.dni;
    handleReportNeighborChange();
    
    // Enfocar descripción de reporte
    document.getElementById("report-description").focus();
    document.getElementById("report-description").scrollIntoView({ behavior: 'smooth' });
}

// Deseleccionar manzana
function deselectBlock() {
    if (selectedBlockId) {
        const prev = document.getElementById(`block-${selectedBlockId}`);
        if (prev) prev.classList.remove("active");
    }
    selectedBlockId = null;
    selectedLotName = null;
}

// SELECCIONAR LUMINARIA (SOBRE PLANO 1)
function selectLuminaire(lumId) {
    if (isEditMode) return;
    
    deselectBlock();
    
    selectedLuminaireId = lumId;
    const lum = database.luminaires.find(l => l.id === lumId);
    if (!lum) return;
    
    renderMapSVG();
    
    const affected = getAffectedNeighborsCount(lum.street);
    
    document.getElementById("float-lum-id").textContent = lum.id;
    document.getElementById("float-lum-street").textContent = `Calle ${lum.street}`;
    
    const statusLabel = document.getElementById("float-lum-status");
    statusLabel.textContent = lum.status === "green" ? "🟢 ENCENDIDA" : "🔴 APAGADA / FALLA";
    statusLabel.className = `status-badge ${lum.status === "green" ? "green" : "red"}`;
    
    document.getElementById("float-lum-affected").textContent = `${affected} vecinos registrados en censo de la cuadra`;
    
    const report = database.reclamos.find(r => r.category === "luminaria" && r.luminaireId === lumId && r.status === "active");
    const reportDescContainer = document.getElementById("float-lum-active-report");
    
    if (report) {
        reportDescContainer.classList.remove("hidden");
        document.getElementById("float-lum-report-desc").textContent = `"${report.description}" (Informado por ${report.neighborName})`;
    } else {
        reportDescContainer.classList.add("hidden");
    }
    
    const actionsContainer = document.getElementById("float-actions-container");
    actionsContainer.innerHTML = "";
    
    if (currentRole === "neighbor") {
        if (lum.status === "green") {
            const btn = document.createElement("button");
            btn.className = "floating-btn danger";
            btn.innerHTML = `<i data-lucide="alert-triangle" class="btn-icon"></i> Reportar Falla`;
            btn.onclick = () => openReportFormWithLum(lum.id);
            actionsContainer.appendChild(btn);
        } else {
            const p = document.createElement("p");
            p.style.color = "var(--color-red)";
            p.style.fontWeight = "600";
            p.textContent = "Apagada. Trabajando en la nota oficial.";
            actionsContainer.appendChild(p);
        }
    } else {
        // Admin
        if (lum.status === "red" && report) {
            const btnPdf = document.createElement("button");
            btnPdf.className = "floating-btn pdf";
            btnPdf.innerHTML = `<i data-lucide="file-text" class="btn-icon"></i> PDF Oficial`;
            btnPdf.onclick = () => generateOfficialPDF(report.id);
            actionsContainer.appendChild(btnPdf);
            
            const btnSolve = document.createElement("button");
            btnSolve.className = "floating-btn success";
            btnSolve.innerHTML = `<i data-lucide="check-check" class="btn-icon"></i> Solucionar`;
            btnSolve.onclick = () => resolveLuminaire(lum.id);
            actionsContainer.appendChild(btnSolve);
        } else if (lum.status === "red") {
            const btnSolve = document.createElement("button");
            btnSolve.className = "floating-btn success";
            btnSolve.innerHTML = `<i data-lucide="check-check" class="btn-icon"></i> Encender`;
            btnSolve.onclick = () => resolveLuminaire(lum.id);
            actionsContainer.appendChild(btnSolve);
        } else {
            const btnDamage = document.createElement("button");
            btnDamage.className = "floating-btn danger";
            btnDamage.innerHTML = `<i data-lucide="slash" class="btn-icon"></i> Apagar`;
            btnDamage.onclick = () => damageLuminaireAdmin(lum.id);
            actionsContainer.appendChild(btnDamage);
        }
        
        // Botón Eliminar
        const btnDelete = document.createElement("button");
        btnDelete.className = "floating-btn secondary";
        btnDelete.style.background = "rgba(255, 255, 255, 0.03)";
        btnDelete.style.border = "1px solid var(--border-color)";
        btnDelete.style.color = "var(--text-secondary)";
        btnDelete.innerHTML = `<i data-lucide="trash-2" class="btn-icon"></i>`;
        btnDelete.title = "Eliminar este poste";
        btnDelete.onclick = () => deleteLuminaire(lum.id);
        actionsContainer.appendChild(btnDelete);
    }
    
    document.getElementById("luminaire-detail-panel").classList.remove("hidden");
    lucide.createIcons();
}

function closeLuminaireFloat() {
    document.getElementById("luminaire-detail-panel").classList.add("hidden");
    selectedLuminaireId = null;
    selectedIncidentId = null;
    renderMapSVG();
}

function openReportFormWithLum(lumId) {
    document.getElementById("report-category").value = "luminaria";
    handleReportCategoryChange();
    document.getElementById("report-luminaria-id").value = lumId;
    
    const lum = database.luminaires.find(l => l.id === lumId);
    if (lum) {
        document.getElementById("report-street").value = lum.street;
        document.getElementById("report-description").value = `Falla de Alumbrado Público: Poste ${lum.id} inoperativo en Calle ${lum.street}.`;
    }
    
    document.getElementById("report-form").scrollIntoView({ behavior: 'smooth' });
}

function resolveLuminaire(lumId) {
    const lum = database.luminaires.find(l => l.id === lumId);
    if (lum) {
        lum.status = "green";
        const reports = database.reclamos.filter(r => r.category === "luminaria" && r.luminaireId === lumId && r.status === "active");
        reports.forEach(r => r.status = "resolved");
        
        saveDatabase();
        renderMapSVG();
        renderClaimsTable();
        closeLuminaireFloat();
    }
}

function damageLuminaireAdmin(lumId) {
    const lum = database.luminaires.find(l => l.id === lumId);
    if (lum) {
        lum.status = "red";
        
        const newReport = {
            id: `REC-ADMIN-${Date.now().toString().slice(-4)}`,
            date: new Date().toISOString().split('T')[0],
            neighborDni: "ADMIN",
            neighborName: "Comisión del Centro Vecinal",
            category: "luminaria",
            luminaireId: lumId,
            manzana: "",
            lote: "",
            street: lum.street,
            description: `Auditoría interna: Alumbrado inoperativo en Poste ${lumId} (Calle ${lum.street}).`,
            status: "active"
        };
        
        database.reclamos.push(newReport);
        saveDatabase();
        renderMapSVG();
        renderClaimsTable();
        selectLuminaire(lumId);
    }
}

function getAffectedNeighborsCount(streetName) {
    if (!streetName) return 0;
    const adjacentMz = STREET_MANZANAS_MAPPING[streetName] || [];
    let count = 0;
    database.census.forEach(v => {
        if (adjacentMz.includes(v.manzana)) {
            count++;
        }
    });
    return count;
}

// Cargar reporte submit
function handleReportSubmit(e) {
    e.preventDefault();
    
    const neighborDni = document.getElementById("report-neighbor").value;
    const category = document.getElementById("report-category").value;
    const description = document.getElementById("report-description").value.trim();
    
    let neighborName = "Centro Vecinal (Administración)";
    if (neighborDni !== "ADMIN") {
        const vecino = database.census.find(v => v.dni === neighborDni);
        if (!vecino) {
            alert("El vecino informante debe estar censado.");
            return;
        }
        neighborName = vecino.name;
    }
    
    let lumId = "";
    let mz = document.getElementById("report-manzana").value;
    let lote = document.getElementById("report-lote").value;
    let street = document.getElementById("report-street").value;
    
    // No longer requiring predefined luminaire selector for Luz Quemada
    
    const newId = `REC-2026-${(database.reclamos.length + 1).toString().padStart(4, '0')}`;
    const newReport = {
        id: newId,
        date: new Date().toISOString().split('T')[0],
        neighborDni,
        neighborName,
        category,
        luminaireId: lumId,
        manzana: mz,
        lote,
        street,
        description,
        status: "active",
        x: clickCoords.x ? clickCoords.x : undefined,
        y: clickCoords.y ? clickCoords.y : undefined
    };
    
    database.reclamos.push(newReport);
    saveDatabase();
    
    alert(`Reporte Oficial Registrado:\nSe ha generado el incidente ${newId}. El Centro Vecinal auditará este caso.`);
    
    document.getElementById("report-form").reset();
    document.getElementById("group-luminaria-select").classList.add("hidden");
    document.getElementById("report-lote").innerHTML = '<option value="">Primero elija Manzana</option>';
    
    // Clear click coordinates
    clickCoords = { x: 0, y: 0 };
    
    renderMapSVG();
    renderClaimsTable();
    closeLuminaireFloat();
}

// Actualizar estadísticas de admin
function updateStats() {
    document.getElementById("stat-census-total").textContent = database.census.length;
    
    const activeClaims = database.reclamos.filter(r => r.status === "active").length;
    document.getElementById("stat-claims-active").textContent = activeClaims;
    
    const brokenLums = database.luminaires.filter(l => l.status === "red").length;
    document.getElementById("stat-lums-off").textContent = brokenLums;
    
    let elderlyCount = 0;
    let childrenCount = 0;
    let disabilityCount = 0;
    
    database.census.forEach(v => {
        if (v.priorities.elderly) elderlyCount++;
        if (v.priorities.children) childrenCount++;
        if (v.priorities.disability) disabilityCount++;
    });
    
    const totalPriority = database.census.filter(v => v.priorities.elderly || v.priorities.children || v.priorities.disability).length;
    
    document.getElementById("stat-priority-total").textContent = totalPriority;
    document.getElementById("stat-priority-elderly").textContent = elderlyCount;
    document.getElementById("stat-priority-children").textContent = childrenCount;
    document.getElementById("stat-priority-disability").textContent = disabilityCount;
}

// Tabla de reportes
function renderClaimsTable() {
    const tbody = document.getElementById("claims-table-body");
    const filterCat = document.getElementById("filter-claims-category").value;
    
    tbody.innerHTML = "";
    
    // Sincronizar el mapa interactivo en pantalla
    renderMapSVG();
    
    const activeClaims = database.reclamos.filter(r => r.status === "active");
    const filteredClaims = filterCat === "all" ? activeClaims : activeClaims.filter(r => r.category === filterCat);
    
    if (filteredClaims.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 24px;">No hay reportes activos registrados.</td></tr>`;
        return;
    }
    
    filteredClaims.forEach(r => {
        const dateParts = r.date.split("-");
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        
        let locText = "";
        if (r.category === "luminaria") {
            locText = r.luminaireId ? `${r.luminaireId} (${r.street})` : `Luz en ${r.street || 'Vía Pública'}`;
        } else {
            locText = `Mz ${r.manzana}`;
            if (r.lote) locText += ` Lote ${r.lote}`;
            if (r.street) locText += ` (${r.street})`;
        }
        
        const catMap = {
            "luminaria": { label: "Alumbrado", class: "category-lumi" },
            "escombros": { label: "Escombros", class: "category-esco" },
            "basura": { label: "Microbasural", class: "category-basu" },
            "autos": { label: "Auto Aband.", class: "category-auto" },
            "agua": { label: "Pérdida Agua", class: "category-agua" },
            "bache": { label: "Bache", class: "category-esco" },
            "tension": { label: "Alta Tensión", class: "category-lumi" }
        };
        const catInfo = catMap[r.category] || { label: "General", class: "" };
        
        const affected = getAffectedNeighborsCount(r.street || getManzanaStreet(r.manzana));
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${formattedDate}</td>
            <td>${locText}</td>
            <td><span class="td-badge ${catInfo.class}">${catInfo.label}</span></td>
            <td><strong>${affected}</strong> hab.</td>
            <td>
                <div style="display: flex; gap: 6px;">
                    <button class="pdf-btn" onclick="generateOfficialPDF('${r.id}')" title="Generar Nota PDF">
                        <i data-lucide="file-down" style="width: 14px; height: 14px;"></i>
                        <span>Nota</span>
                    </button>
                    <button class="pdf-btn" onclick="resolveIncident('${r.id}')" title="Solucionar y limpiar del plano" style="background: var(--color-emerald-bg); border-color: rgba(16,185,129,0.3); color: #34d399;">
                        <i data-lucide="check" style="width: 14px; height: 14px;"></i>
                        <span>Limpiar</span>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    lucide.createIcons();
}

function getManzanaStreet(mzId) {
    if (!mzId) return "";
    for (const [street, mzs] of Object.entries(STREET_MANZANAS_MAPPING)) {
        if (mzs.includes(mzId)) return street;
    }
    return "Calle sin Nombre";
}

// Helper para renderizar plano con marcadores en canvas
function getMapImageCanvas(reportOrCategory, callback) {
    const canvas = document.createElement("canvas");
    canvas.width = 546;
    canvas.height = 524;
    const ctx = canvas.getContext("2d");
    
    const bgImg = new Image();
    bgImg.src = typeof PLANO_BASE64 !== "undefined" ? PLANO_BASE64 : "plano1.png";
    bgImg.onload = () => {
        // Dibujar el plano de fondo estirado a la proporción SVG y con el offset vertical de -16px
        ctx.drawImage(bgImg, 0, -16, 546, 540);
        
        // Dibujar emojis de incidentes activos
        const categoryEmojis = {
            "luminaria": "💡",
            "bache": "🕳️",
            "agua": "💧",
            "basura": "🗑️",
            "tension": "⚡"
        };
        
        // Determinar categoría para filtrar
        let filterCategory = null;
        if (reportOrCategory) {
            if (typeof reportOrCategory === "string") {
                if (reportOrCategory !== "all") {
                    filterCategory = reportOrCategory;
                }
            } else if (reportOrCategory.category) {
                filterCategory = reportOrCategory.category;
            }
        }
        
        database.reclamos.forEach(rec => {
            if (rec.status === "active" && rec.x !== undefined && rec.y !== undefined) {
                if (filterCategory && rec.category !== filterCategory) {
                    return;
                }
                if (rec.category === "luminaria") {
                    ctx.beginPath();
                    ctx.arc(rec.x, rec.y, 9, 0, 2 * Math.PI);
                    ctx.fillStyle = "#ef4444";
                    ctx.fill();
                    ctx.lineWidth = 1.2;
                    ctx.strokeStyle = "#ffffff";
                    ctx.stroke();
                    
                    ctx.fillStyle = "#ffffff";
                    ctx.beginPath();
                    ctx.arc(rec.x, rec.y - 1.5, 3, 0, Math.PI, true);
                    ctx.lineTo(rec.x - 1.5, rec.y + 2);
                    ctx.lineTo(rec.x + 1.5, rec.y + 2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillRect(rec.x - 1.5, rec.y + 2.5, 3, 1);
                } else {
                    const emoji = categoryEmojis[rec.category] || "❓";
                    ctx.font = "20px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(emoji, rec.x, rec.y);
                }
            }
        });
        
        try {
            callback(canvas.toDataURL("image/jpeg", 0.95));
        } catch (e) {
            console.warn("No se pudo exportar el mapa al canvas (restricción CORS en entorno local/file://). Generando PDF sin croquis.", e);
            callback(null);
        }
    };
    bgImg.onerror = () => {
        callback(null);
    };
}

// GENERACIÓN DE NOTA EN PDF (jsPDF)
function generateOfficialPDF(reportId) {
    const report = database.reclamos.find(r => r.id === reportId);
    if (!report) {
        alert("Reclamo no encontrado.");
        return;
    }
    
    getMapImageCanvas(report, (imgData) => {
        let authority = "";
        let department = "";
        
        if (report.category === "luminaria" || report.category === "basura" || report.category === "escombros" || report.category === "autos") {
            authority = "MUNICIPALIDAD DE LA RIOJA CAPITAL";
            department = "Secretaría de Servicios Públicos";
        } else if (report.category === "agua") {
            authority = "AGUAS DE LA RIOJA S.A.";
            department = "Mesa de Entradas de Reclamos Técnicos";
        } else if (report.category === "tension") {
            authority = "EDELAR S.A. (Empresa Distribuidora de Electricidad de La Rioja)";
            department = "Gerencia de Operaciones y Distribución";
        } else {
            authority = "AUTORIDAD COMPETENTE";
            department = "Mesa de Entradas General";
        }
        
        const streetLabel = report.street || getManzanaStreet(report.manzana);
        const adjacentMz = STREET_MANZANAS_MAPPING[streetLabel] || [];
        
        let totalAffected = 0;
        let elderlyAffected = 0;
        let childrenAffected = 0;
        let disabilityAffected = 0;
        
        database.census.forEach(v => {
            if (adjacentMz.includes(v.manzana)) {
                totalAffected++;
                if (v.priorities.elderly) elderlyAffected++;
                if (v.priorities.children) childrenAffected++;
                if (v.priorities.disability) disabilityAffected++;
            }
        });
        
        const dateObj = new Date();
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const formattedDate = `La Rioja, ${dateObj.getDate()} de ${meses[dateObj.getMonth()]} de ${dateObj.getFullYear()}`;
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });
        
        const marginX = 22;
        let currentY = 20;
        
        // PAGE 1: Formal Letter
        // Encabezado
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(30, 41, 59);
        doc.text("CENTRO VECINAL BARRIO GOBERNADOR JUAN MELIS", marginX, currentY);
        
        currentY += 5;
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text("Personería Jurídica Nº 1245-A &bull; Área de Inteligencia Urbana y Catastro Comunitario", marginX, currentY);
        
        currentY += 2;
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.4);
        doc.line(marginX, currentY, 188, currentY);
        
        // Fecha
        currentY += 12;
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text(formattedDate, 188, currentY, { align: "right" });
        
        // Destinatario
        currentY += 12;
        doc.setFont("Helvetica", "bold");
        doc.text("A la Autoridad Responsable de:", marginX, currentY);
        
        currentY += 5;
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.text(authority.toUpperCase(), marginX, currentY);
        
        currentY += 5;
        doc.setFont("Helvetica", "italic");
        doc.setFontSize(10);
        doc.text(department, marginX, currentY);
        
        currentY += 4;
        doc.setFont("Helvetica", "normal");
        doc.text("S        /        D", marginX, currentY);
        
        // Asunto
        currentY += 12;
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10.5);
        
        let refCategory = String(report.category).toLowerCase();
        if (refCategory.includes("lumi")) refCategory = "FALLA DE ALUMBRADO PÚBLICO";
        else if (refCategory.includes("basu")) refCategory = "MICROBASURAL Y RIESGO SANITARIO";
        else if (refCategory.includes("escombro")) refCategory = "OBSTRUCCIÓN DE CALLE POR ESCOMBROS";
        else if (refCategory.includes("auto")) refCategory = "VEHÍCULO ABANDONADO EN VÍA PÚBLICA";
        else if (refCategory.includes("agua")) refCategory = "PÉRDIDA DE AGUA POTABLE Y REBOSE DE CLOACAS";
        else if (refCategory.includes("tension")) refCategory = "RIESGO ELÉCTRICO Y CABLES DE ALTA TENSIÓN";
        else refCategory = refCategory.toUpperCase();
        
        doc.text(`REF: RECLAMO FORMAL URGENTE POR ${refCategory}`, marginX, currentY);
        
        // Cuerpo
        currentY += 12;
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10.5);
        
        let introText = "De nuestra mayor consideración:\n\n";
        introText += "Nos dirigimos a usted, en nuestro carácter de Comisión Directiva del Centro Vecinal del Barrio Gobernador Juan Melis de esta ciudad Capital, a los fines de formular e interponer formal reclamo por la grave problemática vial e infraestructural que afecta de forma directa al sector residencial de nuestro barrio.";
        
        let technicalDetails = "";
        if (report.category === "luminaria") {
            let locationDesc = "";
            if (report.manzana) {
                locationDesc = `en las cercanías de Manzana ${report.manzana}`;
                if (report.lote) locationDesc += `, Lote ${report.lote}`;
            } else {
                locationDesc = `en la vía pública`;
            }
            technicalDetails = `El inconveniente se origina puntualmente por una luminaria pública (luz quemada / fuera de servicio) ubicada sobre la Calle ${streetLabel} ${locationDesc} de este barrio. Se adjunta croquis catastral con la ubicación exacta en el Anexo I.`;
        } else {
            let mzText = report.manzana ? `Manzana ${report.manzana}` : "Sector sin designación";
            let loteText = report.lote ? `Lote ${report.lote}` : "Vía Pública";
            technicalDetails = `El inconveniente reportado se sitúa específicamente en la cuadra de la Calle ${streetLabel}, afectando de forma directa a la parcela catastrada como: ${mzText}, ${loteText} (según los Planos Oficiales de Catastro y Subdivisión del barrio). El desperfecto reportado consiste en: ${report.description}. Adjuntamos ubicación geográfica en Anexo I.`;
        }
        
        let censusImpact = `De acuerdo al relevamiento de datos censales comunitarios registrado en la base de datos de nuestro Centro Vecinal, en esta cuadra e inmediaciones se registra una densidad poblacional directa de ${totalAffected} vecinos censados permanentemente.`;
        
        if (elderlyAffected > 0 || childrenAffected > 0 || disabilityAffected > 0) {
            censusImpact += ` Entre la población afectada directa, alertamos sobre la presencia crítica de sectores vulnerables registrados de atención prioritaria, detallados a continuación: `;
            let vulnerabilities = [];
            if (elderlyAffected > 0) vulnerabilities.push(`${elderlyAffected} adultos mayores de 60 años`);
            if (childrenAffected > 0) vulnerabilities.push(`${childrenAffected} niños menores de 12 años`);
            if (disabilityAffected > 0) vulnerabilities.push(`${disabilityAffected} personas con capacidades especiales`);
            censusImpact += vulnerabilities.join(", ") + ". Esto agudiza considerablemente la peligrosidad y el impacto negativo de esta avería.";
        } else {
            censusImpact += " Esta situación compromete de forma general el libre tránsito, la higiene comunitaria y la seguridad urbana de toda la vecindad inmediata.";
        }
        
        let closingText = "Por lo expuesto, solicitamos a esa repartición pública u organismo técnico arbitrar con carácter de URGENTE los canales operativos y la correspondiente cuadrilla de reparación para dar una solución definitiva a esta situación, evitando accidentes o mayores perjuicios materiales y físicos para los habitantes.\n\n";
        closingText += "A la espera de una pronta y favorable respuesta, saludamos a usted con nuestra consideración más distinguida.";
        
        const splitIntro = doc.splitTextToSize(introText, 166);
        doc.text(splitIntro, marginX, currentY);
        currentY += splitIntro.length * 5;
        
        currentY += 2;
        doc.setFont("Helvetica", "bold");
        const splitTech = doc.splitTextToSize(technicalDetails, 166);
        doc.text(splitTech, marginX, currentY);
        currentY += splitTech.length * 5;
        
        currentY += 2;
        doc.setFont("Helvetica", "normal");
        const splitImpact = doc.splitTextToSize(censusImpact, 166);
        doc.text(splitImpact, marginX, currentY);
        currentY += splitImpact.length * 5;
        
        currentY += 2;
        const splitClose = doc.splitTextToSize(closingText, 166);
        doc.text(splitClose, marginX, currentY);
        
        // PAGE 2: Anexo I with Map + Signatures
        doc.addPage();
        currentY = 20;
        
        // Encabezado de Anexo I
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(30, 41, 59);
        doc.text("ANEXO I: CROQUIS CATASTRAL Y GEOLOCALIZACIÓN DEL RECLAMO", marginX, currentY);
        
        currentY += 3;
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.4);
        doc.line(marginX, currentY, 188, currentY);
        
        // Insert map image if canvas loaded successfully
        if (imgData) {
            currentY += 8;
            doc.addImage(imgData, 'JPEG', marginX, currentY, 166, 160);
            currentY += 160;
        } else {
            currentY += 20;
            doc.setFont("Helvetica", "italic");
            doc.text("[Error al generar el croquis de geolocalización. Consulte la base de datos en app.js]", marginX, currentY);
            currentY += 20;
        }
        
        // Firmas y sellos al pie del Anexo
        currentY = Math.max(currentY + 10, 225);
        
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9.5);
        doc.text("...........................................................", marginX, currentY);
        doc.text("Firma del Presidente", marginX, currentY + 4);
        doc.text("Centro Vecinal Barrio Gdor. Juan Melis", marginX, currentY + 8);
        
        // Sello
        const boxWidth = 55;
        const boxHeight = 22;
        const boxX = 133;
        const boxY = currentY - 5;
        
        doc.setDrawColor(148, 163, 184);
        doc.setLineWidth(0.3);
        doc.rect(boxX, boxY, boxWidth, boxHeight);
        
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text("MESA DE ENTRADAS", boxX + boxWidth/2, boxY + 5, { align: "center" });
        
        doc.setFont("Helvetica", "italic");
        doc.setFontSize(7.5);
        doc.text("SELLO DE RECEPCIÓN", boxX + boxWidth/2, boxY + 11, { align: "center" });
        doc.text("Fecha: ____/____/2026", boxX + 6, boxY + 16);
        doc.text("Firma: ________________", boxX + 6, boxY + 20);
        
        const filename = `Reclamo_Oficial_CV_Melis_${reportId}.pdf`;
        doc.save(filename);
    });
}

// ==================== LOT GEOMETRY ALIGNER TOOL (ADMIN) ====================
function toggleLotEditMode() {
    if (currentRole !== "admin") return;
    
    isLotEditMode = !isLotEditMode;
    
    const btn = document.getElementById("btn-toggle-lot-mode");
    const label = document.getElementById("lot-mode-label");
    const mapWrapper = document.getElementById("map-svg-wrapper");
    const hintLabel = document.getElementById("map-hint-label");
    
    btn.classList.toggle("active", isLotEditMode);
    
    if (isLotEditMode) {
        label.textContent = "Modo Ajuste Activo (Alineando Lotes)";
        mapWrapper.classList.add("edit-mode-active");
        hintLabel.innerHTML = "<strong style='color: var(--color-purple);'>MODO ALINEACIÓN DE LOTES ACTIVO:</strong> Elija Manzana y Lote en el panel, haga clic sobre el plano para posicionarlo y ajuste el tamaño.";
        
        // Llenar selector de manzanas para el alineador
        const mzSelect = document.getElementById("edit-lot-manzana");
        mzSelect.innerHTML = '<option value="">Seleccionar Manzana...</option>';
        Object.keys(MANZANAS_DATA).forEach(mz => {
            if (mz !== "B") { // Manzana B es comunitaria sin lotes residenciales
                const opt = document.createElement("option");
                opt.value = mz;
                opt.textContent = `Manzana ${mz}`;
                mzSelect.appendChild(opt);
            }
        });
        
        if (isEditMode) toggleEditMode();
        closeLuminaireFloat();
        deselectBlock();
    } else {
        label.textContent = "Activar Modo Ajuste de Lote";
        mapWrapper.classList.remove("edit-mode-active");
        hintLabel.textContent = "Haga clic en un Lote (cuadrícula) para registrar/ver el censo, o en una Luminaria para ver reportes.";
        document.getElementById("lot-positioner-controls").classList.add("hidden");
        tempLotGeom = null;
        renderMapSVG();
    }
    
    lucide.createIcons();
}

function loadCurrentLotGeometry() {
    const mz = document.getElementById("edit-lot-manzana").value;
    const lote = document.getElementById("edit-lot-lote").value;
    
    if (!mz || !lote) {
        document.getElementById("lot-positioner-controls").classList.add("hidden");
        tempLotGeom = null;
        renderMapSVG();
        return;
    }
    
    const currentGeom = getLotGeometry(mz, lote);
    tempLotGeom = { ...currentGeom };
    
    document.getElementById("lot-geom-x").value = tempLotGeom.x;
    document.getElementById("lot-geom-y").value = tempLotGeom.y;
    document.getElementById("lot-geom-w").value = tempLotGeom.w;
    document.getElementById("lot-geom-h").value = tempLotGeom.h;
    
    document.getElementById("lot-positioner-controls").classList.remove("hidden");
    renderMapSVG();
}

function updateTempLotGeometry() {
    if (!tempLotGeom) return;
    
    tempLotGeom.x = parseInt(document.getElementById("lot-geom-x").value) || 0;
    tempLotGeom.y = parseInt(document.getElementById("lot-geom-y").value) || 0;
    tempLotGeom.w = parseInt(document.getElementById("lot-geom-w").value) || 10;
    tempLotGeom.h = parseInt(document.getElementById("lot-geom-h").value) || 10;
    
    renderMapSVG();
}

function saveLotGeometry() {
    const mz = document.getElementById("edit-lot-manzana").value;
    const lote = document.getElementById("edit-lot-lote").value;
    
    if (!mz || !lote || !tempLotGeom) return;
    
    if (!database.customLotGeometries) {
        database.customLotGeometries = {};
    }
    if (!database.customLotGeometries[mz]) {
        database.customLotGeometries[mz] = {};
    }
    
    database.customLotGeometries[mz][lote] = { ...tempLotGeom };
    saveDatabase();
    renderMapSVG();
    alert(`Geometría para Lote ${lote} de Manzana ${mz} guardada con éxito.`);
}

function clearLotGeometry() {
    const mz = document.getElementById("edit-lot-manzana").value;
    const lote = document.getElementById("edit-lot-lote").value;
    
    if (!mz || !lote) return;
    
    if (database.customLotGeometries && database.customLotGeometries[mz] && database.customLotGeometries[mz][lote]) {
        delete database.customLotGeometries[mz][lote];
        saveDatabase();
        loadCurrentLotGeometry();
        alert(`Geometría reseteada a valores por defecto.`);
    }
}

function exportLotGeometries() {
    if (!database.customLotGeometries || Object.keys(database.customLotGeometries).length === 0) {
        alert("No hay geometrías personalizadas guardadas para exportar.");
        return;
    }
    const json = JSON.stringify(database.customLotGeometries, null, 4);
    const w = window.open();
    w.document.write("<h3>Copie y guarde este JSON de coordenadas:</h3><pre>" + json + "</pre>");
}

// ==================== METODOS DE HERRAMIENTA DE INCIDENTES Y CENSO DIRECTO ====================
function selectIncidentTool(type) {
    if (activeIncidentTool === type) {
        activeIncidentTool = null;
    } else {
        activeIncidentTool = type;
    }
    
    const buttons = document.querySelectorAll(".tool-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    if (activeIncidentTool) {
        const activeBtn = document.getElementById(`tool-${activeIncidentTool}`);
        if (activeBtn) activeBtn.classList.add("active");
    }
}

function selectIncident(id) {
    if (isEditMode || activeIncidentTool) return;
    
    selectedIncidentId = id;
    selectedLuminaireId = null;
    renderMapSVG();
    
    const rec = database.reclamos.find(r => r.id === id);
    if (!rec) return;
    
    document.getElementById("float-lum-id").textContent = rec.id;
    document.getElementById("float-lum-street").textContent = rec.street || `Coordenadas (${rec.x}, ${rec.y})`;
    
    const catNames = {
        "bache": "🕳️ Bache / Olla",
        "agua": "💧 Pérdida de Agua",
        "basura": "🗑️ Microbasural",
        "tension": "⚡ EDELAR / Cables"
    };
    
    const statusLabel = document.getElementById("float-lum-status");
    statusLabel.textContent = catNames[rec.category] || rec.category.toUpperCase();
    statusLabel.className = "status-badge red";
    
    document.getElementById("float-lum-affected").textContent = `Informado por: ${rec.neighborName}`;
    
    const reportDescContainer = document.getElementById("float-lum-active-report");
    reportDescContainer.classList.remove("hidden");
    document.getElementById("float-lum-report-desc").textContent = `"${rec.description}"`;
    
    const actionsContainer = document.getElementById("float-actions-container");
    actionsContainer.innerHTML = "";
    
    if (currentRole === "admin") {
        const btnPdf = document.createElement("button");
        btnPdf.className = "floating-btn pdf";
        btnPdf.innerHTML = `<i data-lucide="file-text" class="btn-icon"></i> PDF Oficial`;
        btnPdf.onclick = () => generateOfficialPDF(rec.id);
        actionsContainer.appendChild(btnPdf);
        
        const btnSolve = document.createElement("button");
        btnSolve.className = "floating-btn success";
        btnSolve.innerHTML = `<i data-lucide="check-check" class="btn-icon"></i> Solucionar`;
        btnSolve.onclick = () => resolveIncident(rec.id);
        actionsContainer.appendChild(btnSolve);
    } else {
        const p = document.createElement("p");
        p.style.color = "var(--color-amber)";
        p.style.fontWeight = "600";
        p.textContent = "Incidente reportado y en revisión.";
        actionsContainer.appendChild(p);
    }
    
    document.getElementById("luminaire-detail-panel").classList.remove("hidden");
    lucide.createIcons();
}

function resolveIncident(id) {
    const rec = database.reclamos.find(r => r.id === id);
    if (rec) {
        rec.status = "resolved";
        saveDatabase();
        renderMapSVG();
        renderClaimsTable();
        closeLuminaireFloat();
    }
}

function handleCensusDirectSubmit(e) {
    e.preventDefault();
    
    const manzana = document.getElementById("census-manzana").value;
    const lote = document.getElementById("census-lote").value.trim();
    const name = document.getElementById("census-name").value.trim();
    const dni = document.getElementById("census-dni").value.trim();
    const phone = document.getElementById("census-phone").value.trim();
    
    const priorities = {
        elderly: document.getElementById("census-elderly").checked,
        children: document.getElementById("census-children").checked,
        disability: document.getElementById("census-disability").checked
    };
    
    if (editingCensusIndex !== null) {
        database.census[editingCensusIndex] = { dni, name, phone, manzana, lote, priorities };
        editingCensusIndex = null;
        alert("Registro de censo actualizado correctamente.");
    } else {
        if (database.census.some(v => v.dni === dni)) {
            alert("Ya existe un vecino registrado con ese DNI.");
            return;
        }
        database.census.push({ dni, name, phone, manzana, lote, priorities });
        alert("Registro de censo guardado correctamente.");
    }
    
    saveDatabase();
    renderCensusTable();
    
    document.getElementById("census-direct-form").reset();
}

function renderCensusTable() {
    const tbody = document.getElementById("census-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";
    
    if (database.census.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No hay vecinos registrados en el censo.</td></tr>`;
        return;
    }
    
    database.census.forEach((v, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>Mz ${v.manzana} Lote ${v.lote}</td>
            <td>${v.name}</td>
            <td>${v.dni}</td>
            <td>${v.phone}</td>
            <td>
                <div style="display: flex; gap: 4px;">
                    <button class="pdf-btn" onclick="editCensusDirect(${index})" style="background: var(--color-blue-bg); border-color: rgba(59,130,246,0.3); color: #60a5fa; padding: 4px 8px;" title="Editar">
                        <i data-lucide="edit" style="width: 12px; height: 12px;"></i>
                    </button>
                    <button class="pdf-btn" onclick="deleteCensusDirect(${index})" style="background: var(--color-red-bg); border-color: rgba(239,68,68,0.3); color: #f87171; padding: 4px 8px;" title="Borrar">
                        <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    lucide.createIcons();
}

function editCensusDirect(index) {
    const v = database.census[index];
    if (!v) return;
    
    switchRole('neighbor');
    
    editingCensusIndex = index;
    document.getElementById("census-manzana").value = v.manzana;
    document.getElementById("census-lote").value = v.lote;
    document.getElementById("census-name").value = v.name;
    document.getElementById("census-dni").value = v.dni;
    document.getElementById("census-phone").value = v.phone;
    
    document.getElementById("census-elderly").checked = !!v.priorities.elderly;
    document.getElementById("census-children").checked = !!v.priorities.children;
    document.getElementById("census-disability").checked = !!v.priorities.disability;
    
    document.getElementById("census-direct-form").scrollIntoView({ behavior: 'smooth' });
}

function deleteCensusDirect(index) {
    const v = database.census[index];
    if (!v) return;
    if (!confirm(`¿Está seguro de eliminar el registro de censo de ${v.name} (Mz ${v.manzana} Lote ${v.lote})?`)) return;
    
    database.census.splice(index, 1);
    saveDatabase();
    renderCensusTable();
}

// GENERACIÓN DE REPORTE INTEGRAL CON TODOS LOS INCIDENTES EN PDF
function generateGeneralReportPDF() {
    const filterCat = document.getElementById("filter-claims-category") ? document.getElementById("filter-claims-category").value : "all";
    const activeClaims = database.reclamos.filter(r => r.status === "active");
    const filteredClaims = filterCat === "all" ? activeClaims : activeClaims.filter(r => r.category === filterCat);
    
    if (filteredClaims.length === 0) {
        alert("No hay incidencias activas en la categoría seleccionada para reportar.");
        return;
    }
    
    getMapImageCanvas(filterCat, (imgData) => {
        const dateObj = new Date();
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const formattedDate = `La Rioja, ${dateObj.getDate()} de ${meses[dateObj.getMonth()]} de ${dateObj.getFullYear()}`;
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });
        
        const marginX = 20;
        let currentY = 20;
        
        // PAGINA 1: Detalle de Reclamos
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(30, 41, 59);
        
        const catTitles = {
            "all": "INFORME INTEGRAL DE INCIDENCIAS URBANAS",
            "luminaria": "INFORME DE FALLAS DE ALUMBRADO PÚBLICO",
            "bache": "INFORME DE BACHES Y CALZADAS",
            "agua": "INFORME DE PÉRDIDAS DE AGUA Y CLOACAS",
            "basura": "INFORME DE MICROBASURALES Y RESIDUOS",
            "tension": "INFORME DE RIESGO ELÉCTRICO (EDELAR)",
            "escombros": "INFORME DE OBSTÁCULOS Y ESCOMBROS",
            "autos": "INFORME DE VEHÍCULOS ABANDONADOS"
        };
        
        doc.text(catTitles[filterCat] || "INFORME DE INCIDENCIAS URBANAS", marginX, currentY);
        
        currentY += 6;
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text("CENTRO VECINAL BARRIO GOBERNADOR JUAN MELIS - RELEVAMIENTO GENERAL", marginX, currentY);
        
        currentY += 4;
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.4);
        doc.line(marginX, currentY, 190, currentY);
        
        currentY += 10;
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text(formattedDate, 190, currentY, { align: "right" });
        
        currentY += 10;
        doc.setFont("Helvetica", "bold");
        doc.text(`Resumen de Incidencias Activas (${filteredClaims.length}):`, marginX, currentY);
        
        currentY += 8;
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(9);
        doc.text("ID", marginX, currentY);
        doc.text("Tipo", marginX + 30, currentY);
        doc.text("Ubicación", marginX + 60, currentY);
        doc.text("Descripción", marginX + 110, currentY);
        
        currentY += 2;
        doc.line(marginX, currentY, 190, currentY);
        
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8.5);
        
        const getCleanCategoryLabel = (category) => {
            const clean = String(category).toLowerCase();
            if (clean.includes("agua")) return "Pérdida Agua";
            if (clean.includes("lumi") || clean.includes("alumb")) return "Alumbrado/Luz";
            if (clean.includes("bache") || clean.includes("pozo")) return "Bache/Calle";
            if (clean.includes("basu") || clean.includes("residu")) return "Microbasural";
            if (clean.includes("tension") || clean.includes("cable")) return "EDELAR/Cables";
            if (clean.includes("escombro") || clean.includes("obstruc")) return "Escombros";
            if (clean.includes("auto") || clean.includes("chatarra")) return "Auto Aband.";
            return category;
        };
        
        const catColors = {
            "luminaria": { r: 239, g: 68, b: 68 },   // Rojo
            "bache": { r: 245, g: 158, b: 11 },     // Naranja
            "agua": { r: 59, g: 130, b: 246 },       // Azul
            "basura": { r: 16, g: 185, b: 129 },     // Verde
            "tension": { r: 139, g: 92, b: 246 },    // Violeta
            "escombros": { r: 100, g: 116, b: 139 },  // Gris
            "autos": { r: 51, g: 65, b: 85 }         // Slate
        };
        
        filteredClaims.forEach(r => {
            currentY += 7;
            if (currentY > 275) {
                doc.addPage();
                currentY = 20;
            }
            doc.text(r.id, marginX, currentY);
            
            // Determinar color de la categoría
            const cleanCat = String(r.category).toLowerCase();
            let catKey = "agua";
            if (cleanCat.includes("lumi")) catKey = "luminaria";
            else if (cleanCat.includes("bache")) catKey = "bache";
            else if (cleanCat.includes("agua")) catKey = "agua";
            else if (cleanCat.includes("basu")) catKey = "basura";
            else if (cleanCat.includes("tension")) catKey = "tension";
            else if (cleanCat.includes("escombro")) catKey = "escombros";
            else if (cleanCat.includes("auto")) catKey = "autos";
            
            const color = catColors[catKey] || { r: 100, g: 116, b: 139 };
            
            // Dibujar círculo indicador
            doc.setFillColor(color.r, color.g, color.b);
            doc.circle(marginX + 32, currentY - 1, 1.2, "F");
            
            // Escribir el texto de la categoría
            doc.setTextColor(30, 41, 59);
            const cleanLabel = getCleanCategoryLabel(r.category);
            doc.text(cleanLabel, marginX + 35, currentY);
            
            let loc = `Mz ${r.manzana || '-'}`;
            if (r.lote) loc += ` Lote ${r.lote}`;
            if (r.street) loc += ` (${r.street})`;
            doc.text(loc, marginX + 60, currentY);
            
            let desc = r.description || "";
            if (desc.length > 40) desc = desc.substring(0, 40) + "...";
            doc.text(desc, marginX + 110, currentY);
        });
        
        // PAGINA 2: Croquis Catastral con las incidencias filtradas
        doc.addPage();
        currentY = 20;
        
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(30, 41, 59);
        doc.text("ANEXO I: CROQUIS CATASTRAL DE GEOLOCALIZACIÓN FILTRADO", marginX, currentY);
        
        currentY += 4;
        doc.line(marginX, currentY, 190, currentY);
        
        if (imgData) {
            currentY += 8;
            doc.addImage(imgData, 'JPEG', marginX, currentY, 170, 163);
            currentY += 165;
        } else {
            currentY += 20;
            doc.setFont("Helvetica", "italic");
            doc.text("[Error al generar el croquis del plano catastral]", marginX, currentY);
            currentY += 20;
        }
        
        currentY = Math.max(currentY + 10, 220);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9.5);
        doc.text("...........................................................", marginX, currentY);
        doc.text("Firma del Presidente", marginX, currentY + 4);
        doc.text("Centro Vecinal Barrio Gdor. Juan Melis", marginX, currentY + 8);
        
        const boxWidth = 55;
        const boxHeight = 22;
        const boxX = 135;
        const boxY = currentY - 5;
        
        doc.setDrawColor(148, 163, 184);
        doc.setLineWidth(0.3);
        doc.rect(boxX, boxY, boxWidth, boxHeight);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text("MESA DE ENTRADAS", boxX + boxWidth/2, boxY + 5, { align: "center" });
        
        const filename = `Informe_${filterCat.toUpperCase()}_Incidencias_CV_Melis.pdf`;
        doc.save(filename);
    });
}

// Globalización de Métodos
window.switchRole = switchRole;
window.toggleEditMode = toggleEditMode;
window.handleReportSubmit = handleReportSubmit;
window.handleReportNeighborChange = handleReportNeighborChange;
window.handleReportCategoryChange = handleReportCategoryChange;
window.renderClaimsTable = renderClaimsTable;
window.selectLuminaire = selectLuminaire;
window.closeLuminaireFloat = closeLuminaireFloat;
window.openReportFormWithLum = openReportFormWithLum;
window.resolveLuminaire = resolveLuminaire;
window.generateOfficialPDF = generateOfficialPDF;
window.damageLuminaireAdmin = damageLuminaireAdmin;
window.handleMapClick = handleMapClick;
window.closeAddLuminaireModal = closeAddLuminaireModal;
window.saveNewLuminaire = saveNewLuminaire;
window.deleteLuminaire = deleteLuminaire;
window.clearAllLuminaires = clearAllLuminaires;

window.selectIncidentTool = selectIncidentTool;
window.selectIncident = selectIncident;
window.resolveIncident = resolveIncident;
window.handleCensusDirectSubmit = handleCensusDirectSubmit;
window.renderCensusTable = renderCensusTable;
window.editCensusDirect = editCensusDirect;
window.deleteCensusDirect = deleteCensusDirect;
window.generateGeneralReportPDF = generateGeneralReportPDF;

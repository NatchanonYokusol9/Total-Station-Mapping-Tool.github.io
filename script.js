// ฟังก์ชันตรวจสอบค่าของ HA (องศา, ลิปดา, พิลิปดา)
function validateAngleInput(id, min, max) {
    let input = document.getElementById(id);
    let value = parseInt(input.value);

    if (isNaN(value) || value < min || value > max) {
        input.value = min;
    }
}

function generateSurveyTable() {
    let numPoints = parseInt(document.getElementById("num_points").value);

    if (isNaN(numPoints) || numPoints <= 0) {
        alert("กรุณากรอกจำนวนหมุดรังวัดให้ถูกต้อง");
        return;
    }

    let tableContainer = document.getElementById("survey_table_container");
    tableContainer.innerHTML = "";

    let table = document.createElement("table"); 
    table.border = "1"; 
    table.innerHTML = `
        <tr>
            <th>ชื่อจุด</th>
            <th>Zone UTM</th>
            <th colspan="3">HA (มุมแนวราบ)</th>
            <th>VD (m)</th>
            <th>HD (m)</th>
            <th>HI (m)</th>
        </tr>
        <tr>
            <th></th>
            <th></th>
            <th>°</th>
            <th>'</th>
            <th>''</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    `;

    for (let i = 1; i <= numPoints; i++) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" id="point_name_${i}" placeholder="ชื่อจุด"></td>
            <td><input type="number" id="utm_zone_${i}" placeholder="Zone (47, 48)" min="1" max="60"></td>
            <td><input type="number" id="ha_deg_${i}" min="0" max="359" placeholder="°"></td>
            <td><input type="number" id="ha_min_${i}" min="0" max="59" placeholder="'"></td>
            <td><input type="number" id="ha_sec_${i}" min="0" max="59" placeholder="''"></td>
            <td><input type="number" id="vd_${i}" placeholder="VD (m)"></td>
            <td><input type="number" id="hd_${i}" placeholder="HD (m)"></td>
            <td><input type="number" id="hi_${i}" placeholder="HI (m)"></td>
        `;
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
}


// ฟังก์ชันอัปเดต dropdown
function updateDropdownOptions() {
    let selectPointDropdown = document.getElementById("select_point");
    selectPointDropdown.innerHTML = `<option value="">-- เลือกจุด --</option>`; 

    let numPoints = parseInt(document.getElementById("num_points").value);
    
    for (let i = 1; i <= numPoints; i++) {
        let pointName = document.getElementById(`point_name_${i}`).value.trim();
        if (pointName !== "") {
            let option = document.createElement("option");
            option.value = pointName;
            option.text = pointName;
            selectPointDropdown.appendChild(option);
        }
    }
}

function generateControlTable() {
    let selectedPoint = document.getElementById("select_point").value;
    if (!selectedPoint) {
        alert("กรุณาเลือกจุดที่ต้องการกำหนดพิกัด");
        return;
    }

    let tableContainer = document.getElementById("control_table_container");
    tableContainer.innerHTML = ""; 

    let table = document.createElement("table");
    table.border = "1";
    table.innerHTML = `
        <tr>
            <th>ชื่อจุด</th>
            <th colspan="3">Azimuth (มุมทิศทาง)</th>
            <th>Easting (m)</th>
            <th>Northing (m)</th>
        </tr>
        <tr>
            <th></th>
            <th>°</th>
            <th>'</th>
            <th>''</th>
            <th></th>
            <th></th>
        </tr>
        <tr>
            <td>${selectedPoint}</td>
            <td><input type="number" id="azimuth_deg_${selectedPoint}" min="0" max="359" placeholder="°"></td>
            <td><input type="number" id="azimuth_min_${selectedPoint}" min="0" max="59" placeholder="'"></td>
            <td><input type="number" id="azimuth_sec_${selectedPoint}" min="0" max="59" placeholder="''"></td>
            <td><input type="number" id="control_easting_${selectedPoint}" placeholder="Easting (m)"></td>
            <td><input type="number" id="control_northing_${selectedPoint}" placeholder="Northing (m)"></td>
        </tr>
    `;

    tableContainer.appendChild(table);
}

function generateSurveyTable() {
    let numPoints = parseInt(document.getElementById("num_points").value);

    if (isNaN(numPoints) || numPoints <= 0) {
        alert("กรุณากรอกจำนวนหมุดรังวัดให้ถูกต้อง");
        return;
    }

    let tableContainer = document.getElementById("survey_table_container");
    tableContainer.innerHTML = "";

    let table = document.createElement("table"); 
    table.border = "1"; 
    table.innerHTML = `
        <tr>
            <th>ชื่อจุด</th>
            <th>Zone UTM</th>
            <th colspan="3">HA (มุมแนวราบ)</th>
            <th>VD (m)</th>
            <th>HD (m)</th>
            <th>HI (m)</th>
        </tr>
        <tr>
            <th></th>
            <th></th>
            <th>°</th>
            <th>'</th>
            <th>''</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    `;

    let selectPointDropdown = document.getElementById("select_point");
    selectPointDropdown.innerHTML = `<option value="">-- เลือกจุด --</option>`; 

    for (let i = 1; i <= numPoints; i++) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" id="point_name_${i}" placeholder="ชื่อจุด" onchange="updateDropdownOptions()"></td>
            <td><input type="number" id="utm_zone_${i}" placeholder="Zone (47, 48)" min="1" max="60"></td>
            <td><input type="number" id="ha_deg_${i}" min="0" max="359" placeholder="°"></td>
            <td><input type="number" id="ha_min_${i}" min="0" max="59" placeholder="'"></td>
            <td><input type="number" id="ha_sec_${i}" min="0" max="59" placeholder="''"></td>
            <td><input type="number" id="vd_${i}" placeholder="VD (m)"></td>
            <td><input type="number" id="hd_${i}" placeholder="HD (m)"></td>
            <td><input type="number" id="hi_${i}" placeholder="HI (m)"></td>
        `;
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
    updateDropdownOptions();  // 📌 อัปเดต dropdown เมื่อสร้างตาราง
}
function updateDropdownOptions() {
    let selectPointDropdown = document.getElementById("select_point");
    selectPointDropdown.innerHTML = `<option value="">-- เลือกจุด --</option>`; 

    let numPoints = parseInt(document.getElementById("num_points").value);
    
    for (let i = 1; i <= numPoints; i++) {
        let pointName = document.getElementById(`point_name_${i}`).value.trim();
        if (pointName !== "") {
            let option = document.createElement("option");
            option.value = pointName;
            option.text = pointName;
            selectPointDropdown.appendChild(option);
        }
    }
}

// ฟังก์ชันลบตารางหมุดรังวัด
function clearSurveyTable() {
    document.getElementById("survey_table_container").innerHTML = "";
    document.getElementById("num_points").value = "";
    document.getElementById("select_point").innerHTML = `<option value="">-- เลือกจุด --</option>`;
}

// ฟังก์ชันลบตารางพิกัดอ้างอิง
function clearControlTable() {
    document.getElementById("control_table_container").innerHTML = "";
}
// ฟังก์ชันแปลง DMS (องศา, ลิปดา, พิลิปดา) ไปเป็นทศนิยม
function convertDMS_to_Decimal(deg, min, sec) {
    return parseFloat(deg) + (parseFloat(min) / 60) + (parseFloat(sec) / 3600);
}

function convertUTMToLatLon(easting, northing, zone, isNorthernHemisphere = true) {
    const a = 6378137.0; // Semi-major axis (WGS84)
    const f = 1 / 298.257223563; // Flattening (WGS84)
    const k0 = 0.9996; // Scale factor
    const e = Math.sqrt(f * (2 - f)); // ค่าเยื้องของทรงรี

    let e1sq = e * e / (1 - e * e);
    
    // 📌 ปรับค่า Northing สำหรับซีกโลกใต้
    if (!isNorthernHemisphere) {
        northing -= 10000000;
    }

    // 📌 แก้ไขค่าศูนย์กลางโซน UTM ให้แม่นยำขึ้น
    let longitudeOrigin = (zone - 1) * 6 - 180 + 3; // ใช้ค่าศูนย์กลางของโซนที่แม่นยำขึ้น

    // 📌 คำนวณค่าพารามิเตอร์
    let m = northing / k0;
    let mu = m / (a * (1 - (e * e / 4) - (3 * e * e * e * e / 64) - (5 * e * e * e * e * e * e / 256)));

    let e1 = (1 - Math.sqrt(1 - e * e)) / (1 + Math.sqrt(1 - e * e));

    let phi1Rad = mu + ((3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu))
                     + ((21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu))
                     + ((151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu));

    let n1 = a / Math.sqrt(1 - e * e * Math.sin(phi1Rad) * Math.sin(phi1Rad));
    let t1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
    let c1 = e1sq * Math.cos(phi1Rad) * Math.cos(phi1Rad);
    let r1 = a * (1 - e * e) / Math.pow(1 - e * e * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
    let d = (easting - 500000) / (n1 * k0);

    // 📌 คำนวณ Latitude
    let lat = phi1Rad - (n1 * Math.tan(phi1Rad) / r1) * (
                  (d * d / 2)
                - (5 + 3 * t1 + 10 * c1 - 4 * c1 * c1 - 9 * e1sq) * (d * d * d * d / 24)
                + (61 + 90 * t1 + 298 * c1 + 45 * t1 * t1 - 252 * e1sq - 3 * c1 * c1) * (d * d * d * d * d * d / 720)
              );

    lat = lat * (180 / Math.PI);

    // 📌 แก้สมการการคำนวณ Longitude ให้แม่นยำขึ้น
    let lon = longitudeOrigin + ((d - (1 + 2 * t1 + c1) * (d * d * d / 6)
        + (5 - 2 * c1 + 28 * t1 - 3 * c1 * c1 + 8 * e1sq + 24 * t1 * t1) * (d * d * d * d * d / 120)) 
        / Math.cos(phi1Rad)) * (180 / Math.PI);

    return { latitude: lat, longitude: lon };
}

function calculateSurveyData() {
    let resultContainer = document.getElementById("result");
    let calculationContainer = document.getElementById("calculationSteps");
    resultContainer.innerHTML = ""; 
    calculationContainer.innerHTML = ""; // ล้างข้อมูลเก่า

    let selectedPoint = document.getElementById("select_point").value;
    if (!selectedPoint) {
        alert("กรุณาเลือกจุดที่ใช้เป็นพิกัดอ้างอิง");
        return;
    }

    let eastingRef = parseFloat(document.getElementById(`control_easting_${selectedPoint}`).value);
    let northingRef = parseFloat(document.getElementById(`control_northing_${selectedPoint}`).value);
    let zoneUTM = parseInt(document.getElementById(`utm_zone_1`).value);

    let azimuthDegRef = parseInt(document.getElementById(`azimuth_deg_${selectedPoint}`).value) || 0;
    let azimuthMinRef = parseInt(document.getElementById(`azimuth_min_${selectedPoint}`).value) || 0;
    let azimuthSecRef = parseInt(document.getElementById(`azimuth_sec_${selectedPoint}`).value) || 0;

    let azimuthRef = convertDMS_to_Decimal(azimuthDegRef, azimuthMinRef, azimuthSecRef);
    
    let latlonRef = convertUTMToLatLon(eastingRef, northingRef, zoneUTM, true);

    let calculationDetails = `<h3>📍 คำนวณพิกัดจาก Total Station</h3>
                              <p><strong>พิกัดอ้างอิง (${selectedPoint}):</strong></p>
                              <p>Easting = ${eastingRef}, Northing = ${northingRef}, Zone = ${zoneUTM}</p>
                              <p>Azimuth อ้างอิง: ${azimuthRef.toFixed(6)}°</p>
                              <p>Latitude = ${latlonRef.latitude.toFixed(6)}, Longitude = ${latlonRef.longitude.toFixed(6)}</p><hr>`;

    let outputHTML = `<h3>ผลลัพธ์พิกัดใหม่</h3><table border='1'>
                      <tr><th>ชื่อจุด</th><th>Zone</th><th>Azimuth (°)</th><th>Easting (m)</th><th>Northing (m)</th><th>Latitude</th><th>Longitude</th></tr>`;

    outputHTML += `<tr>
            <td>${selectedPoint} (พิกัดอ้างอิง)</td>
            <td>${zoneUTM}</td>
            <td>-</td>
            <td>${eastingRef.toFixed(3)}</td>
            <td>${northingRef.toFixed(3)}</td>
            <td>${latlonRef.latitude.toFixed(6)}</td>
            <td>${latlonRef.longitude.toFixed(6)}</td>
        </tr>`;

    let numPoints = parseInt(document.getElementById("num_points").value);
    
    for (let i = 1; i <= numPoints; i++) {
        let pointName = document.getElementById(`point_name_${i}`).value.trim();
        if (pointName === selectedPoint) continue;

        let haDeg = parseInt(document.getElementById(`ha_deg_${i}`).value) || 0;
        let haMin = parseInt(document.getElementById(`ha_min_${i}`).value) || 0;
        let haSec = parseInt(document.getElementById(`ha_sec_${i}`).value) || 0;
        let hd = parseFloat(document.getElementById(`hd_${i}`).value);

        let haDecimal = convertDMS_to_Decimal(haDeg, haMin, haSec);
        let azimuthCurrent = azimuthRef + haDecimal;
        if (azimuthCurrent >= 360) azimuthCurrent -= 360;

        let azimuthRadian = azimuthCurrent * (Math.PI / 180);
        let eastingNew = eastingRef + (hd * Math.sin(azimuthRadian));
        let northingNew = northingRef + (hd * Math.cos(azimuthRadian));

        let latlon = convertUTMToLatLon(eastingNew, northingNew, zoneUTM, true);

        calculationDetails += `<h4>📍 จุด: ${pointName}</h4>`;
        calculationDetails += `<p><strong>1. คำนวณมุม Azimuth:</strong></p>`;
        calculationDetails += `<p>Azimuth = Azimuth อ้างอิง + HA</p>`;
        calculationDetails += `<p>${azimuthRef.toFixed(6)}° + ${haDecimal.toFixed(6)}° = <strong>${azimuthCurrent.toFixed(6)}°</strong></p>`;

        calculationDetails += `<p><strong>2. คำนวณพิกัดใหม่:</strong></p>`;
        calculationDetails += `<p>Easting = Easting อ้างอิง + (HD × sin(Azimuth))</p>`;
        calculationDetails += `<p>${eastingRef.toFixed(3)} + (${hd} × sin(${azimuthCurrent.toFixed(6)}°)) = <strong>${eastingNew.toFixed(3)}</strong></p>`;

        calculationDetails += `<p>Northing = Northing อ้างอิง + (HD × cos(Azimuth))</p>`;
        calculationDetails += `<p>${northingRef.toFixed(3)} + (${hd} × cos(${azimuthCurrent.toFixed(6)}°)) = <strong>${northingNew.toFixed(3)}</strong></p>`;

        calculationDetails += `<p><strong>3. แปลงเป็นค่าพิกัด Latitude, Longitude:</strong></p>`;
        calculationDetails += `<p>Latitude = ${latlon.latitude.toFixed(6)}, Longitude = ${latlon.longitude.toFixed(6)}</p><hr>`;

        outputHTML += `<tr>
            <td>${pointName}</td>
            <td>${zoneUTM}</td>
            <td>${azimuthCurrent.toFixed(6)}</td>
            <td>${eastingNew.toFixed(3)}</td>
            <td>${northingNew.toFixed(3)}</td>
            <td>${latlon.latitude.toFixed(6)}</td>
            <td>${latlon.longitude.toFixed(6)}</td>
        </tr>`;
    }

    outputHTML += "</table>";
    resultContainer.innerHTML = outputHTML;
    calculationContainer.innerHTML = calculationDetails;
}

// ฟังก์ชันเปิด Popup แสดงวิธีคำนวณ
function showCalculationPopup() {
    let popup = document.getElementById("calculationPopup");
    popup.style.display = "block";
}

// ฟังก์ชันปิด Popup
function closeCalculationPopup() {
    let popup = document.getElementById("calculationPopup");
    popup.style.display = "none";
}

// ปิด Popup เมื่อกดที่พื้นที่นอกกล่อง
window.onclick = function(event) {
    let popup = document.getElementById("calculationPopup");
    if (event.target === popup) {
        popup.style.display = "none";
    }
}

// ฟังก์ชันเปิดหน้าแผนที่
function openMapPage() {
    let resultContainer = document.getElementById("result");
    let tableRows = resultContainer.getElementsByTagName("tr");
    let coordinates = [];
    for (let i = 1; i < tableRows.length; i++) {
        let cells = tableRows[i].getElementsByTagName("td");
        if (cells.length >= 7) {
            let name = cells[0].innerText;
            let lat = parseFloat(cells[5].innerText);
            let lon = parseFloat(cells[6].innerText);
            
            coordinates.push({ name, lat, lon });
        }
    }
    if (coordinates.length === 0) {
        alert("ยังไม่มีค่าพิกัด กรุณาคำนวณก่อน!");
        return;
    }
    localStorage.setItem("mapCoordinates", JSON.stringify(coordinates));
    window.location.href = "map.html";
}
function saveFormData() {
    let numPoints = document.getElementById("num_points").value;
    let selectPoint = document.getElementById("select_point").value;
    
    // 📌 บันทึกค่าจากตารางรังวัด
    let surveyData = [];
    for (let i = 1; i <= numPoints; i++) {
        let pointName = document.getElementById(`point_name_${i}`)?.value || "";
        let zone = document.getElementById(`utm_zone_${i}`)?.value || "";
        let haDeg = document.getElementById(`ha_deg_${i}`)?.value || "";
        let haMin = document.getElementById(`ha_min_${i}`)?.value || "";
        let haSec = document.getElementById(`ha_sec_${i}`)?.value || "";
        let vd = document.getElementById(`vd_${i}`)?.value || "";
        let hd = document.getElementById(`hd_${i}`)?.value || "";
        let hi = document.getElementById(`hi_${i}`)?.value || "";

        surveyData.push({ pointName, zone, haDeg, haMin, haSec, vd, hd, hi });
    }

    // 📌 บันทึกค่าพิกัดอ้างอิง (รวมถึงค่าในตารางจุดอ้างอิง)
    let controlData = {};
    if (selectPoint) {
        controlData = {
            selectedPoint: selectPoint,
            azimuthDeg: document.getElementById(`azimuth_deg_${selectPoint}`)?.value || "",
            azimuthMin: document.getElementById(`azimuth_min_${selectPoint}`)?.value || "",
            azimuthSec: document.getElementById(`azimuth_sec_${selectPoint}`)?.value || "",
            easting: document.getElementById(`control_easting_${selectPoint}`)?.value || "",
            northing: document.getElementById(`control_northing_${selectPoint}`)?.value || ""
        };
    }

    // 📌 บันทึกผลลัพธ์ที่คำนวณ
    let resultData = document.getElementById("result").innerHTML;

    // 📌 บันทึกทั้งหมดลงใน sessionStorage
    let formData = { numPoints, surveyData, controlData, resultData };
    sessionStorage.setItem("formData", JSON.stringify(formData));
}

function loadFormData() {
    let storedData = sessionStorage.getItem("formData");
    if (!storedData) return;

    let formData = JSON.parse(storedData);

    // 📌 โหลดค่าจำนวนหมุดรังวัด
    document.getElementById("num_points").value = formData.numPoints;
    generateSurveyTable(); // ✅ สร้างตารางใหม่ก่อนใส่ค่ากลับเข้าไป

    // 📌 โหลดค่าที่กรอกไว้ในตารางรังวัด
    formData.surveyData.forEach((data, index) => {
        let i = index + 1;
        document.getElementById(`point_name_${i}`).value = data.pointName;
        document.getElementById(`utm_zone_${i}`).value = data.zone;
        document.getElementById(`ha_deg_${i}`).value = data.haDeg;
        document.getElementById(`ha_min_${i}`).value = data.haMin;
        document.getElementById(`ha_sec_${i}`).value = data.haSec;
        document.getElementById(`vd_${i}`).value = data.vd;
        document.getElementById(`hd_${i}`).value = data.hd;
        document.getElementById(`hi_${i}`).value = data.hi;
    });

    // 📌 อัปเดต dropdown เพื่อให้มีค่าจุดให้เลือก
    updateDropdownOptions();

    // 📌 โหลดค่าพิกัดอ้างอิงที่เลือกไว้
    if (formData.controlData.selectedPoint) {
        document.getElementById("select_point").value = formData.controlData.selectedPoint;
        generateControlTable(); // ✅ สร้างตารางพิกัดอ้างอิงใหม่
        let selectedPoint = formData.controlData.selectedPoint;
        document.getElementById(`azimuth_deg_${selectedPoint}`).value = formData.controlData.azimuthDeg;
        document.getElementById(`azimuth_min_${selectedPoint}`).value = formData.controlData.azimuthMin;
        document.getElementById(`azimuth_sec_${selectedPoint}`).value = formData.controlData.azimuthSec;
        document.getElementById(`control_easting_${selectedPoint}`).value = formData.controlData.easting;
        document.getElementById(`control_northing_${selectedPoint}`).value = formData.controlData.northing;
    }

    // 📌 โหลดผลลัพธ์ที่เคยคำนวณไว้
    document.getElementById("result").innerHTML = formData.resultData;
}

window.onload = function () {
    loadFormData();
};

function openMapPage() {
    saveFormData(); // บันทึกข้อมูลก่อนเปลี่ยนหน้า

    let resultContainer = document.getElementById("result");
    let tableRows = resultContainer.getElementsByTagName("tr");
    
    let coordinates = [];

    for (let i = 1; i < tableRows.length; i++) {
        let cells = tableRows[i].getElementsByTagName("td");
        if (cells.length >= 7) {
            let name = cells[0].innerText;
            let lat = parseFloat(cells[5].innerText);
            let lon = parseFloat(cells[6].innerText);
            
            coordinates.push({ name, lat, lon });
        }
    }

    if (coordinates.length === 0) {
        alert("ยังไม่มีค่าพิกัด กรุณาคำนวณก่อน!");
        return;
    }

    localStorage.setItem("mapCoordinates", JSON.stringify(coordinates));
    window.location.href = "map.html";
}

function clearCalculatedData() {
    if (confirm("คุณต้องการลบผลลัพธ์ทั้งหมดหรือไม่?")) {
        document.getElementById("result").innerHTML = ""; // ล้างผลลัพธ์ที่แสดงอยู่
        document.getElementById("calculationSteps").innerHTML = ""; // ล้างวิธีคำนวณที่แสดง
        sessionStorage.removeItem("formData"); // ลบข้อมูลคำนวณที่บันทึกไว้
        alert("ลบข้อมูลสำเร็จ! กรุณากรอกข้อมูลใหม่เพื่อคำนวณอีกครั้ง");
    }
}

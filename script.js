const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const DOW = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"];

  const today = new Date();
  today.setHours(0,0,0,0);
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let selectedDate = new Date(today);

  function dotsForWeekday(dow){
    if(dow === 0 || dow === 6) return [];
    if(dow === 1 || dow === 3) return ["d-pink","d-pink","d-blue"];
    if(dow === 2 || dow === 4) return ["d-orange","d-purple"];
    if(dow === 5) return ["d-orange","d-purple"];
    return [];
  }

  function sameDay(a,b){
    return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
  }

  function buildCalendar(){
    document.getElementById("monthLabel").textContent = MESES[viewMonth];
    const grid = document.getElementById("calGrid");
    grid.innerHTML = "";

    const firstDay = new Date(viewYear, viewMonth, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const cells = [];
    for(let i=0;i<startOffset;i++){
      const dnum = daysInPrevMonth - startOffset + 1 + i;
      cells.push({num:dnum, dim:true, date:new Date(viewYear, viewMonth-1, dnum)});
    }
    for(let d=1; d<=daysInMonth; d++){
      const date = new Date(viewYear, viewMonth, d);
      cells.push({num:d, dim:false, dow:date.getDay(), date});
    }
    let next=1;
    while(cells.length % 7 !== 0){
      cells.push({num:next, dim:true, date:new Date(viewYear, viewMonth+1, next)});
      next++;
    }

    cells.forEach(c=>{
      const el = document.createElement("div");
      el.className = "day" + (c.dim ? " dim":"");
      const isToday = sameDay(c.date, today);
      const isSelected = sameDay(c.date, selectedDate);
      if(isToday) el.classList.add("today");
      if(isSelected) el.classList.add("selected");

      const numEl = document.createElement("div");
      numEl.className = "num";
      numEl.textContent = c.num;
      el.appendChild(numEl);

      const dotsWrap = document.createElement("div");
      dotsWrap.className = "dots";
      if(!c.dim){
        dotsForWeekday(c.date.getDay()).forEach(cls=>{
          const s = document.createElement("span");
          s.className = cls;
          dotsWrap.appendChild(s);
        });
      }
      el.appendChild(dotsWrap);

      el.addEventListener("click", ()=>{
        selectedDate = new Date(c.date);
        if(c.dim){ viewYear = c.date.getFullYear(); viewMonth = c.date.getMonth(); }
        buildCalendar();
        buildAgenda();
      });

      grid.appendChild(el);
    });
  }

  function buildAgenda(){
    document.getElementById("selDow").textContent = DOW[selectedDate.getDay()];
    document.getElementById("selNum").textContent = selectedDate.getDate();
    document.getElementById("dayNumBtn").textContent = selectedDate.getDate();

    const agenda = document.getElementById("agenda");
    agenda.innerHTML = "";
    const isToday = sameDay(selectedDate, today);

    if(!isToday){
      agenda.innerHTML = '<div class="empty-state">No tienes actividades registradas este día.</div>';
      return;
    }

    const gymCard = document.createElement("div");
    gymCard.className = "gym-card";
    gymCard.innerHTML = `
      <div>
        <div class="title">Gimnasio</div>
        <div class="loc">Campus Gustavo Galindo, 4E,<br>G001</div>
        <div class="time">12:00 - 13:00</div>
      </div>
      <div class="gicon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--orange)" stroke-width="2"><path d="M6 8v8M4 10v4M20 10v4M18 8v8M8 12h8"/></svg></div>
    `;
    agenda.appendChild(gymCard);

    const classes = [
      {cls:"dark", name:"CCPG1051 - PROGRAMACIÓN DE SISTEMAS", time:"13:00 - 14:00", room:"P-3"},
      {cls:"light", name:"CCPG1051 - PROGRAMACIÓN DE SISTEMAS", time:"14:00 - 15:00", room:"P-103"},
    ];
    classes.forEach(c=>{
      const card = document.createElement("div");
      card.className = "class-card " + c.cls;
      card.innerHTML = `
        <div>
          <div class="label">CLASE</div>
          <div class="name">${c.name}</div>
          <div class="time">${c.time}</div>
        </div>
        <div class="room">${c.room}</div>
      `;
      agenda.appendChild(card);
    });
  }

  document.getElementById("prevMonth").addEventListener("click", ()=>{
    viewMonth--; if(viewMonth<0){viewMonth=11; viewYear--;}
    buildCalendar();
  });
  document.getElementById("nextMonth").addEventListener("click", ()=>{
    viewMonth++; if(viewMonth>11){viewMonth=0; viewYear++;}
    buildCalendar();
  });

  buildCalendar();
  buildAgenda();

// ---------- Lógica de la Imagen QR Flotante ----------
const qrBtn = document.getElementById("navQr");
const qrImage = document.getElementById("qrFloatingImage");

// Mostrar la imagen al tocar el botón de la barra inferior
qrBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Evita que el clic se propague y cierre el QR inmediatamente
  qrImage.classList.remove("hidden");
});

// Ocultar la imagen al tocar cualquier parte de la pantalla
document.addEventListener("click", (e) => {
  // Si el clic NO fue en la imagen del QR y la imagen NO está oculta
  if (e.target !== qrImage && !qrImage.classList.contains("hidden")) {
    qrImage.classList.add("hidden");
  }
});

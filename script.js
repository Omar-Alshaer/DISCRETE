function showSection(section) {
    let html = "";

    if (section === "modDiv") {
      html = `
        <h3>Mod / Div Calculator</h3>
        <input type="number" id="a" placeholder="Enter A" onkeydown="handleEnter(event, calcModDiv)" />
        <input type="number" id="b" placeholder="Enter B" onkeydown="handleEnter(event, calcModDiv)" />
        <br>
        <button onclick="calcModDiv()">Calculate</button>
        <div id="output"></div>
      `;
    }

    if (section === "gcd") {
      html = `
        <h3>GCD (Euclidean Algorithm)</h3>
        <input type="number" id="a" placeholder="Enter A" onkeydown="handleEnter(event, calcGCD)" />
        <input type="number" id="b" placeholder="Enter B" onkeydown="handleEnter(event, calcGCD)" />
        <br>
        <button onclick="calcGCD()">Calculate</button>
        <div id="output"></div>
      `;
    }

    if (section === "prime") {
      html = `
        <h3>Prime Checker</h3>
        <input type="number" id="n" placeholder="Enter a number" onkeydown="handleEnter(event, checkPrime)" />
        <br>
        <button onclick="checkPrime()">Check</button>
        <div id="output"></div>
      `;
    }

    if (section === "pairwise") {
      html = `
        <h3>Pairwise Relatively Prime Check</h3>
        <input type="text" id="nums" placeholder="Enter numbers (e.g. 3,4,5)" onkeydown="handleEnter(event, checkPairwise)" />
        <br>
        <button onclick="checkPairwise()">Check</button>
        <div id="output"></div>
      `;
    }

    document.getElementById("content").innerHTML = html;
  }

  function handleEnter(event, func) {
    if (event.key === "Enter") {
      func();
    }
  }

  function calcModDiv() {
    let a = parseInt(document.getElementById("a").value);
    let b = parseInt(document.getElementById("b").value);
    if (b === 0) {
      document.getElementById("output").innerHTML = "Division by zero!";
      return;
    }
    let q = Math.floor(a / b);
    let r = ((a % b) + Math.abs(b)) % Math.abs(b);
    document.getElementById("output").innerHTML = `
      ${a} div ${b} = ${q} <br>
      ${a} mod ${b} = ${r}
    `;
  }

  function calcGCD() {
    let a = parseInt(document.getElementById("a").value);
    let b = parseInt(document.getElementById("b").value);
    let steps = "";
    let x = Math.abs(a), y = Math.abs(b);
    while (y !== 0) {
      let q = Math.floor(x / y);
      let r = x % y;
      steps += `${x} = ${y} × ${q} + ${r}<br>`;
      [x, y] = [y, r];
    }
    document.getElementById("output").innerHTML = steps + `<br><strong>GCD = ${x}</strong>`;
  }

  function checkPrime() {
    let n = parseInt(document.getElementById("n").value);
    if (n < 2) {
      document.getElementById("output").innerHTML = `${n} is not prime.`;
      return;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        document.getElementById("output").innerHTML = `${n} is not prime.`;
        return;
      }
    }
    document.getElementById("output").innerHTML = `${n} is a prime number!`;
  }

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  function checkPairwise() {
    let input = document.getElementById("nums").value;
    let nums = input.split(",").map(n => parseInt(n.trim()));
    let allPairsRelativelyPrime = true;
    let output = "";

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        let g = gcd(nums[i], nums[j]);
        output += `gcd(${nums[i]}, ${nums[j]}) = ${g}<br>`;
        if (g !== 1) {
          allPairsRelativelyPrime = false;
        }
      }
    }

    output += `<br><strong>Result: ${allPairsRelativelyPrime ? "Yes, Pairwise Relatively Prime" : "No, Not Pairwise Relatively Prime"}</strong>`;
    document.getElementById("output").innerHTML = output;
  }
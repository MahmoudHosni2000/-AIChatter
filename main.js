// Add functionality to "submit" button
document.getElementById("submit-btn").addEventListener("click", function () {
    submitAction();
  });
  
  document
    .getElementById("word-input")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        submitAction();
      }
    });
  
  function submitAction() {
    // Clear the response field content
    document.querySelector(".Result-box").textContent = "";
  
    sendToChatGPT();
    // Clear the input field content
    document.getElementById("word-input").value = "";
  }
  
  //Handling API request
  function sendToChatGPT() {
    let value = document.getElementById("word-input").value;
  
    // Create the message payload
    let body = {
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: value
      }],
    };
  
    // Authorization request header
    let headers = {
      // OpenAi Secret key
      Authorization: "Bearer 'Put Here OpenAi Secret key' ",
    };
  
    // Send request to OpenAI using Axios library
    axios
      .post("https://api.openai.com/v1/chat/completions", body, {
        headers: headers,
      })
      .then((response) => {
        let reply = response.data.choices[0].message.content;
        ShowResponse(reply);
      })
      .catch((error) => {
        console.error("Error sending request to OpenAI:", error);
        // Display an error message to the user
        ShowResponse("Sorry, there was an error processing your request. Please try again later.");
      });
  }
  
  
  //Append ChatGPT reply to "resultBox"
  function ShowResponse(reply) {
    const resultBox = document.querySelector(".Result-box");
    const inputValue = reply;
  
    // Create a new <p> element
    const newParagraph = document.createElement("p");
  
    // Set the text content of the <p> element
    newParagraph.textContent = reply;
    newParagraph.classList.add("Result");
  
    // Append the new <p> element to the "Result-box"
    resultBox.appendChild(newParagraph);
    resultBox.style.padding = "15px 40px";
    resultBox.style.justifyContent = "flex-start";
    // Check + Convert
    Arabic(newParagraph, inputValue);
  }
  
  //Function to Handle text direction
  function Arabic(element, text) {
    // Detect the language (e.g., Arabic)
    const isArabic = isArabicText(text);
  
    // Set text direction based on language
    if (isArabic) {
      element.style.direction = "rtl";
    } else {
      element.style.direction = "ltr"; // Left-to-right for non-Arabic text
    }
  }
  
  // A simple check for Arabic text based on Unicode character range
  function isArabicText(text) {
    const arabicRegex =
      /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(text);
  }
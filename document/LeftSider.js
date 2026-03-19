// html 左侧添加容器
export function HtmlAddLeftBox() {
  let dive = document.createElement("div")
  dive.innerHTML = `
    <div class="rollbar2z" data-extension-upload="true">
    <ul>
    </ul>
  </div>
    `
  document.body.appendChild(dive)
}

// 左侧按钮 创建按钮 改成 点击后执行函数
// beforeClick 函数 用于在点击前执行的函数, 比如手动填写数据
// (data) => {
/**var Id = window.prompt("请输入Javbus (Id):");
  if (!Id) {
    return null
  }
  data.id = Id
  data.referer = document.location.href
  console.log(data, "data2");
  return data
      })
*/
export function HtmlLeftMakeButton(text, type, func = () => { }, svg = "", resetTime = 0) {
  // 添加按钮
  var button = document.createElement("button");
  button.classList.add("extension-button")
  button.setAttribute("role", "button")
  button.setAttribute("title", text)

  button.addEventListener("click", function () {



    this.disabled = !0
    this.classList.add("loading")

    func().then((data) => {
      console.log("click to post chrome upload:", type, data);
      if (type != "") {
        // postMessage
        window.postMessage({
          "type": type,
          "data": data,
        }, '*');
      }
      // post paopao
      this.classList.remove("loading")
      this.classList.add("success")
    });

    if (resetTime > 0) {
      setTimeout(() => {
        this.disabled = !1
        this.classList.remove("success")
      }, resetTime);
    }
  })

  if (svg == "") {
    svg = `<svg class="download-icon" width="18.75" height="18.75" viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M11.99 16l-5.7-5.7L7.7 8.88l3.29 3.3V2.59h2v9.59l3.3-3.3 1.41 1.42-5.71 5.7zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"> </path> </g> </svg>`
  }

  // 创建一个新的 div 元素
  var newDiv = document.createElement("div");
  newDiv.innerHTML = `
                  <div class="extension-button-container">
                    <div class="extension-button-hover"></div>
                    `+ svg + `
                    <svg class="loading-icon" viewBox="0 0 32 32" aria-hidden="true" width="18.75" height="18.75"> <circle cx="16" cy="16" fill="none" r="14" stroke-width="4"></circle> <circle cx="16" cy="16" fill="none" r="14" stroke-width="4"></circle> </svg>
                    <svg class="success-icon" viewBox="0 0 24 24" aria-hidden="true" width="18.75" height="18.75"> <g> <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"> </path> </g> </svg>
                  </div>
                `;
  button.appendChild(newDiv)

  return button
}

//添加元素
export function LeftBoxAddButton(buttons = []) {
  for (let i = 0; i < buttons.length; i++) {
    const element = buttons[i];
    // 创建新的li元素
    var newListItem = document.createElement("li");
    newListItem.appendChild(element)
    var h6tip = document.createElement("h6");
    h6tip.textContent = element.getAttribute("title")
    h6tip.appendChild(document.createElement("i"))
    newListItem.appendChild(h6tip)
    document.querySelector(".rollbar2z").querySelector("ul").appendChild(newListItem)
  }
}


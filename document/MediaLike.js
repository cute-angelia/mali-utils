
// 媒体上，添加点赞按钮
// css extension-like-button
export function MediaAddHeartOn(rest_id, has_liked, elementParent, callback, divClass = "", divStyle = "") {

  // 已添加过点赞按钮
  if (elementParent.getAttribute("data-extension-liked") !== null) {
    return
  }
  // 记录点赞状态
  elementParent.setAttribute("data-extension-liked", rest_id)

  // 点赞按钮容器
  const container = document.createElement("div");
  container.classList.add(...divClass.split(' '))
  container.setAttribute("style", divStyle)
  elementParent.appendChild(container)

  // 点赞按钮
  const l = document.createElement("button");
  l.classList.add("extension-like-button")
  l.setAttribute("role", "button")
  l.setAttribute("data-rest_id", rest_id)

  // 根据 has_liked 动态设置初始 status
  const initialStatus = has_liked ? "1" : "0";

  l.insertAdjacentHTML("beforeend", `
              <div class="extension-like-button-container">
                <div class="extension-like-button-hover"></div>
                <svg class="default-icon" data-e2e="media_like" data-e2e_status="${initialStatus}" data-rest_id="` + rest_id + `" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                <svg class="success-icon" data-e2e="media_like" data-e2e_status="1" data-rest_id="`+ rest_id + `" width="24" height="24" viewBox="0 0 128 128"><path fill="#7742cc" d="M96.67 15.85h-.2c-.49 0-.99 0-1.48.02c-5.18.09-10.21 1.24-14.96 3.23c-5.09 2.15-8.58 5.35-13.11 8.23c-.85.54-1.89.81-2.92.81c-1.04 0-2.08-.27-2.93-.81c-4.52-2.88-8.02-6.08-13.11-8.23c-4.75-1.99-9.78-3.14-14.96-3.23c-.49-.02-.98-.02-1.47-.02h-.2c-13.12 0-22.69 7.54-28.3 20.65C.63 42.08.59 50.48 1.57 56.34c.98 5.84 3.41 11.11 6.72 16.03C19.32 88.8 39 96.42 53.19 109.66c1.51 1.41 3.01 2.94 4.55 4.35c1.64 1.51 3.62 4.99 6.26 5.15c2.63-.16 4.62-3.63 6.26-5.15c1.54-1.42 3.03-2.94 4.55-4.35C89 96.42 108.67 88.8 119.7 72.38c3.31-4.92 5.74-10.19 6.72-16.03c.98-5.86.94-14.27-1.46-19.84c-5.61-13.12-15.17-20.66-28.29-20.66"/></svg>
              </div>
            `)

  if (has_liked) {
    l.classList.add("success")
  }
  // click
  l.addEventListener("click", function () {
    this.disabled = !0
    const rest_id = this.getAttribute("data-rest_id");
    callback(rest_id).then((data) => {
      this.classList.add("success")
      // 点击成功后，将内部所有 e2e_status 设为 "1"
      this.querySelectorAll('[data-e2e="media_like"]').forEach(svg => {
        svg.setAttribute("data-e2e_status", "1");
      });
    }).catch(() => {
      this.disabled = false; // 失败恢复点击
    });
  })

  // 点赞按钮
  container.appendChild(l)
  elementParent.appendChild(container)
}

// 从元素中移除点赞按钮
export function RemoveLikeByHeartSvg(element) {
  element.parentNode.parentNode.classList.remove("success")
  element.setAttribute("data-e2e_status", "0");
}

// 媒体上，添加下载按钮
export function MediaDownloadButton(rest_id, elementParent, callback) {
  var flat = elementParent.getAttribute("data-MediaDownloadButton-" + rest_id);
  if (flat) {
    return
  }
  elementParent.setAttribute("data-MediaDownloadButton-" + rest_id, "true");

  const l = document.createElement("button");
  l.classList.add("extension-button")
  l.setAttribute("role", "button")
  l.setAttribute("data-rest_id", rest_id)
  l.insertAdjacentHTML("beforeend", `
              <div class="extension-button-container">
              <div class="extension-button-hover"></div>
                <svg class="download-icon" width="18.75" height="18.75" viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M11.99 16l-5.7-5.7L7.7 8.88l3.29 3.3V2.59h2v9.59l3.3-3.3 1.41 1.42-5.71 5.7zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"> </path> </g> </svg>
                <svg class="loading-icon" viewBox="0 0 32 32" aria-hidden="true" width="18.75" height="18.75"> <circle cx="16" cy="16" fill="none" r="14" stroke-width="4"></circle> <circle cx="16" cy="16" fill="none" r="14" stroke-width="4"></circle> </svg>
                <svg class="success-icon" viewBox="0 0 24 24" aria-hidden="true" width="18.75" height="18.75"> <g> <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"> </path> </g> </svg> </div>
            `)

  // if (has_liked) {
  //   l.classList.add("success")
  // }

  elementParent.appendChild(l)

  // click
  l.addEventListener("click", function () {
    // this.preventDefault();
    this.disabled = !0
    this.classList.add("loading")

    const rest_id = this.getAttribute("data-rest_id");

    console.log("click", rest_id)

    callback(rest_id).then((data) => {
      console.log("clicked", rest_id, data)
      this.classList.remove("loading")
      this.classList.add("success")
    })
  })
}
let [nextBtn, previousBtn, mainImg, slidesEl, overlay, thumbnailWrapper, thumbnailList] = ['next', 'previous', 'main', 'slides', 'overlay', 'thumbnails_wrapper', 'thumbnails'].map(el => document.querySelector(`.${el}`))
let thumbnails = document.querySelectorAll('.thumbnail')
let wrapperRect = thumbnailWrapper.getBoundingClientRect();
let getCurrentThumb = () => document.querySelector('.thumbnail[active]')
let visibleSlide = (thumbnail) => {
    const thumbnailRect = thumbnail.getBoundingClientRect();
    const isHidden = thumbnailRect.left < wrapperRect.left || thumbnailRect.right > wrapperRect.right;
    const currentTransform = parseFloat(thumbnailList.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    if (!isHidden) {
        thumbnailList.style.transform = `translateX(${currentTransform}px)`;
        return false;
    }
    if (thumbnailRect.left < wrapperRect.left) thumbnailList.style.transform = `translateX(${currentTransform + (wrapperRect.left - thumbnailRect.left)}px)`;
    if (thumbnailRect.right > wrapperRect.right) thumbnailList.style.transform = `translateX(${currentTransform + (wrapperRect.right - thumbnailRect.right)}px)`;
}

let setActiveThumbnail = (currentThumb, newThumb) => {
    mainImg.setAttribute('src', newThumb.getAttribute('main'))
    visibleSlide(newThumb)
    currentThumb.removeAttribute('active')
    newThumb.toggleAttribute('active')
}
let handleNext = () => {
    let currentThumb = getCurrentThumb()
    let nextThumb = currentThumb.nextElementSibling ?? document.querySelector('.thumbnail') ?? undefined
    if (!nextThumb) return false
    setActiveThumbnail(currentThumb, nextThumb)
}
let handlePrevious = () => {
    let currentThumb = getCurrentThumb()
    let previousThumb = currentThumb.previousElementSibling ?? undefined
    if (!previousThumb) return false
    setActiveThumbnail(currentThumb, previousThumb)
}
let handlePick = (e) => {
    let currentThumb = getCurrentThumb()
    let newThumb = e.target.classList.contains('thumbnail') ? e.target : e.target.closest('.thumbnail')
    setActiveThumbnail(currentThumb, newThumb)
}

let handlePreview = () => {
    let el = slidesEl.cloneNode(true)
    overlay.style.display = "flex"
    overlay.appendChild(el)
    // Gán lại các sự kiện cho các phần tử mới được clone
    const clonedNextBtn = el.querySelector('.next')
    const clonedPreviousBtn = el.querySelector('.previous')
    const clonedThumbnails = el.querySelectorAll('.thumbnail')
    thumbnailWrapper = el.querySelector('.thumbnails_wrapper')
    thumbnailWrapper = el.querySelector('.thumbnails_wrapper')
    wrapperRect = thumbnailWrapper.getBoundingClientRect();
    thumbnailList = el.querySelector('.thumbnails')
    mainImg = el.querySelector('.main')
    clonedNextBtn.addEventListener('click', handleNext)
    clonedPreviousBtn.addEventListener('click', handlePrevious)
    clonedThumbnails.forEach(el => el.addEventListener('click', handlePick))
    mainImg.addEventListener('click', handlePreview)
}
let handleClosePreview = (e) => {
    if (e.target.classList.contains('overlay')) {
        overlay.innerHTML = ''
        overlay.style.display = 'none'
    }

}
overlay.addEventListener('click', handleClosePreview)
nextBtn.addEventListener('click', handleNext)
previousBtn.addEventListener('click', handlePrevious)
thumbnails.forEach(el => el.addEventListener('click', handlePick))
mainImg.addEventListener('click', handlePreview)


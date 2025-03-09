export const smoothScroll = (e, elementId) => {
    e.preventDefault();

    const target = document.getElementById(elementId);

    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}
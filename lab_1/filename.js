window.onload = () => {
    document
        .getElementById("subscribe-form")
        .addEventListener("submit", e => {
            e.preventDefault();
            alert(event.target.elements.email.value);
        })
}



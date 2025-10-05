async function LogOut() {
    const token = localStorage.getItem("token");

    try {
        await fetch("http://localhost:8080/user/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token ?? ""}`,
            },
        });
    } catch (error) {
        console.error("errore nel fetch logout: " + error);
    } finally {
        alert("Logout completed");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "index.html";
    }
}

export default LogOut;
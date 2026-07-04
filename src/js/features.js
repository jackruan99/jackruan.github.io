// 1. Check if the URL has the secret parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('naughty') === 'true') {
    // 2. Save it to localStorage so the browser remembers it forever
    localStorage.setItem('naughty-feature-unlocked', 'true');
    
    // Optional: Clean up the URL so the parameter disappears from the address bar
    window.history.replaceState({}, document.title, window.location.pathname);
}

// 3. Now, check localStorage instead of just the URL
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('naughty-feature-unlocked') === 'true') {
        document.body.classList.add('naughty-feature-enabled');
        console.log("Naughty mode feature flag activated!");
    }
});

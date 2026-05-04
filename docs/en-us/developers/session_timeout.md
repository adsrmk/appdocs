# Idle Users & Session Timeout

By default, a WordPress user session can last up to **14 days**, depending on whether the user ticks the **Remember Me** box. If someone logs in from a shared computer (a library, co-working space, etc.) and forgets to log out, their account stays accessible — and vulnerable.

An **automatic idle session timeout** mitigates that risk. The setup below combines **JavaScript** for monitoring user activity with a small **PHP** snippet that loads the script and sets the correct logout URL.

<br>

## Step 1 — Create the idle-logout script

This script monitors user activity (mouse movement, key presses, scrolling, clicks) on all admin pages. After a defined period of inactivity, it shows a warning dialog with a countdown — and if the user doesn't respond, it automatically logs them out.

Create a new JavaScript file at `/public_html/js/idle-logout.js`:

```js [/public_html/js/idle-logout.js]
(function () {
    // Inactivity timeout in ms. 15 minutes = 900000 ms.
    const IDLE_TIMEOUT = 900000;
    // Warning shown this long before logout. 1 minute = 60000 ms.
    const WARNING_TIME = 60000;

    let idleTimer;
    let warningTimer;
    let isWarningVisible = false;

    function resetTimers() {
        if (isWarningVisible) {
            return; // Don't reset while the warning is already up
        }
        clearTimeout(idleTimer);
        clearTimeout(warningTimer);

        idleTimer = setTimeout(showWarning, IDLE_TIMEOUT - WARNING_TIME);
    }

    function showWarning() {
        isWarningVisible = true;

        const dialog = document.createElement('div');
        dialog.id = 'idle-warning-dialog';
        dialog.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; padding: 40px; border: 1px solid #ccc; z-index: 9999; text-align: center;';

        const message = document.createElement('p');
        message.innerHTML = 'You have been idle for a while. You will be logged out in <span id="idle-countdown">60</span> seconds.';

        const button = document.createElement('button');
        button.textContent = 'Stay Logged In';
        button.onclick = function () {
            isWarningVisible = false;
            document.body.removeChild(dialog);
            resetTimers();
        };

        dialog.appendChild(message);
        dialog.appendChild(button);
        document.body.appendChild(dialog);

        // Start the final countdown
        let countdown = WARNING_TIME / 1000;
        const countdownElement = document.getElementById('idle-countdown');
        warningTimer = setInterval(function () {
            countdown--;
            if (countdown > 0) {
                countdownElement.textContent = countdown;
            } else {
                logoutUser();
            }
        }, 1000);
    }

    function logoutUser() {
        // logout_url is provided by wp_localize_script
        window.location.href = idle_logout_vars.logout_url;
    }

    // Listen for activity
    window.onload = resetTimers;
    document.onmousemove = resetTimers;
    document.onkeypress = resetTimers;
    document.onclick = resetTimers;
    document.onscroll = resetTimers;
})();
```

<br>

## Step 2 — Load the script and set the logout URL

Add the following to your active theme's `functions.php`:

```php [/public_html/wp-content/themes/your-theme/functions.php]
/**
 * Enqueue the idle logout script on admin pages.
 */
add_action( 'admin_enqueue_scripts', 'enqueue_idle_logout_script' );

function enqueue_idle_logout_script( $hook ) {
    // Don't load on the login page
    if ( $hook === 'wp-login.php' ) {
        return;
    }

    $script_path = site_url('/js/idle-logout.js');

    wp_enqueue_script(
        'idle-logout',
        $script_path,
        [ 'jquery' ], // ensures proper load order
        '1.0',
        true
    );

    wp_localize_script( 'idle-logout', 'idle_logout_vars', [
        'logout_url' => wp_logout_url( home_url() )
    ]);
}
```

<div class="info custom-block" style="padding-top: 8px">
Update <code>$script_path</code> if your script isn't located under <code>public_html/js/</code>.
</div>

<br>

## How it works

1. The `idle-logout.js` script loads on every admin page.
2. After **14 minutes** of inactivity (`IDLE_TIMEOUT - WARNING_TIME`), the warning dialog appears with a 60-second countdown.
3. If the user clicks **Stay Logged In**, the dialog disappears and the main timer restarts.
4. If the countdown finishes without input, the script redirects the user to the WordPress logout URL, ending the session.

The result: a robust, user-friendly session timeout that strengthens your site's security posture without disrupting active users.

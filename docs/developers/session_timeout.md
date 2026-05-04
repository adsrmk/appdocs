# Inactieve gebruikers & sessie-timeout

Standaard kan een WordPress-gebruikerssessie tot wel **14 dagen** duren, afhankelijk van of de gebruiker het vakje **Onthoud mij** aanvinkt. Logt iemand in vanaf een gedeelde computer (bibliotheek, co-workingspace, etc.) en vergeet uit te loggen? Dan blijft het account toegankelijk — en kwetsbaar.

Met een **automatische idle session-timeout** beperk je dat risico. De onderstaande opzet combineert **JavaScript** voor het monitoren van gebruikersactiviteit met een kleine **PHP**-snippet die het script inlaadt en de juiste logout-URL meegeeft.

<br>

## Stap 1 — Maak het idle-logout-script aan

Dit script monitort gebruikersactiviteit (muisbewegingen, toetsaanslagen, scrollen, kliks) op alle adminpagina's. Na een ingestelde periode van inactiviteit verschijnt er een waarschuwingsdialoog met een aftelteller — als de gebruiker niet reageert, wordt deze automatisch uitgelogd.

Maak een nieuw JavaScript-bestand aan op `/public_html/js/idle-logout.js`:

```js [/public_html/js/idle-logout.js]
(function () {
    // Inactiviteits-timeout in ms. 15 minuten = 900000 ms.
    const IDLE_TIMEOUT = 900000;
    // Waarschuwing verschijnt zoveel ms voor de logout. 1 minuut = 60000 ms.
    const WARNING_TIME = 60000;

    let idleTimer;
    let warningTimer;
    let isWarningVisible = false;

    function resetTimers() {
        if (isWarningVisible) {
            return; // Niet resetten zolang de waarschuwing zichtbaar is
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
        message.innerHTML = 'Je bent al even inactief. Over <span id="idle-countdown">60</span> seconden word je automatisch uitgelogd.';

        const button = document.createElement('button');
        button.textContent = 'Ingelogd blijven';
        button.onclick = function () {
            isWarningVisible = false;
            document.body.removeChild(dialog);
            resetTimers();
        };

        dialog.appendChild(message);
        dialog.appendChild(button);
        document.body.appendChild(dialog);

        // Start het laatste aftellen
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
        // logout_url wordt aangeleverd via wp_localize_script
        window.location.href = idle_logout_vars.logout_url;
    }

    // Luister naar gebruikersactiviteit
    window.onload = resetTimers;
    document.onmousemove = resetTimers;
    document.onkeypress = resetTimers;
    document.onclick = resetTimers;
    document.onscroll = resetTimers;
})();
```

<br>

## Stap 2 — Laad het script en stel de logout-URL in

Voeg het volgende toe aan het `functions.php`-bestand van je actieve thema:

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
/**
 * Laad het idle-logout-script op adminpagina's.
 */
add_action( 'admin_enqueue_scripts', 'enqueue_idle_logout_script' );

function enqueue_idle_logout_script( $hook ) {
    // Niet laden op de inlogpagina
    if ( $hook === 'wp-login.php' ) {
        return;
    }

    $script_path = site_url('/js/idle-logout.js');

    wp_enqueue_script(
        'idle-logout',
        $script_path,
        [ 'jquery' ], // zorgt voor de juiste laadvolgorde
        '1.0',
        true
    );

    wp_localize_script( 'idle-logout', 'idle_logout_vars', [
        'logout_url' => wp_logout_url( home_url() )
    ]);
}
```

<div class="info custom-block" style="padding-top: 8px">
Pas <code>$script_path</code> aan als je script niet onder <code>public_html/js/</code> staat.
</div>

<br>

## Hoe werkt het?

1. Het `idle-logout.js`-script wordt op elke adminpagina ingeladen.
2. Na **14 minuten** inactiviteit (`IDLE_TIMEOUT - WARNING_TIME`) verschijnt de waarschuwingsdialoog met een aftelteller van 60 seconden.
3. Klikt de gebruiker op **Ingelogd blijven**? Dan verdwijnt de dialoog en herstart de hoofd-timer.
4. Reageert de gebruiker niet binnen de aftelperiode? Dan stuurt het script hem of haar door naar de WordPress-logout-URL en wordt de sessie beëindigd.

Het resultaat: een betrouwbare, gebruiksvriendelijke sessie-timeout die de beveiliging van je site versterkt zonder actieve gebruikers in de weg te zitten.

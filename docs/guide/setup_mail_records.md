# Mail-DNS instellen

E-mail-DNS-records zorgen ervoor dat je berichten correct, veilig en betrouwbaar worden afgeleverd. Net als bij je website moeten de juiste DNS-records worden ingesteld — anders kunnen e-mails niet aankomen of in de spam belanden.

De vier essentiële records zijn: **A**, **SPF**, **DKIM** en **DMARC**.

<div class="tip custom-block" style="padding-top: 8px">
Gebruik je de nameservers van OS Cloud? Dan kun je deze stappen overslaan. Voor optimale aflevering raden we alsnog aan om <b>DKIM</b> in te schakelen en een <b>DMARC</b>-record toe te voegen.
</div>

<br>

## A-record (IPv4)

Het **A-record** koppelt je mail-subdomein aan het IPv4-adres van je mailserver. Je vindt dit IP-adres in het OS Cloud-paneel onder **"At a glance"** of in de domeininstellingen.

| Type | Hostnaam | Waarde |
| --- | --- | --- |
| **A** | `mail.jouwdomein.nl` | Mailserver-IP uit het paneel |

<br>

## SPF

**SPF (Sender Policy Framework)** geeft aan welke mailservers e-mails namens jouw domein mogen versturen. Dit voorkomt spoofing en verbetert de afleverbaarheid.

OS Cloud gebruikt [Mailgun](https://www.mailgun.com/) voor het verzenden en ontvangen van e-mails, dus Mailgun moet worden opgenomen in je SPF-record als geautoriseerde afzender.

| Type | Hostnaam | Waarde |
| --- | --- | --- |
| **TXT** | `@` | `v=spf1 include:mailgun.org ~all` |

<br>

## DKIM

**DKIM (DomainKeys Identified Mail)** gebruikt cryptografische handtekeningen om de identiteit van de afzender te verifiëren en te bevestigen dat e-mails onderweg niet zijn aangepast. DKIM wordt opgeslagen als TXT-record.

### DKIM inschakelen in OS Cloud

1. Ga naar **Websites** in de linkerzijbalk.
2. Selecteer de website die je wilt configureren.
3. Open **Domeinen** in het bovenste menu en selecteer het domein.
4. Scrol naar **E-mailauthenticatie** en zet **DKIM** op **Aan**.
5. Gebruik je OS Cloud-nameservers? Wacht dan tot de validatie is voltooid.

<br>

<img width="1338" height="229" alt="image" src="https://github.com/user-attachments/assets/e8651eba-8efa-470e-85a3-d0918575522a" />

<br>

<div class="info custom-block" style="padding-top: 8px">
Wordt je DNS elders gehost? Volg dan de instructies op het scherm en plak de gegenereerde DKIM-sleutel in je DNS-provider. Het record ziet er ongeveer zo uit:
</div>

| Type | Hostnaam | Waarde |
| --- | --- | --- |
| **TXT** | `hostingcp._domainkey` | *Gegenereerde DKIM-sleutel* |

<br>

## DMARC

**DMARC (Domain-based Message Authentication, Reporting, and Conformance)** beschermt je domein tegen phishing en spoofing. Het werkt samen met **SPF** en **DKIM** om er zeker van te zijn dat alleen geautoriseerde servers namens jou e-mails versturen.

| Type | Hostnaam | Waarde |
| --- | --- | --- |
| **TXT** | `_dmarc` | `v=DMARC1; p=none; rua=mailto:example@jouwdomein.nl` |

DMARC gebruikt drie belangrijke tags:

- **`v`** — DMARC-versie (altijd `DMARC1`, momenteel de enige geldige).
- **`p`** — Het beleid voor mislukte e-mails:
  - **`none`** — Er wordt geen actie ondernomen bij mislukte berichten.
  - **`quarantine`** — Mislukte berichten worden naar de spam-/junkmap gestuurd.
  - **`reject`** — Mislukte berichten worden geblokkeerd en bereiken de ontvanger nooit.
- **`rua`** — E-mailadres waarnaar DMARC-rapporten worden verzonden (bijv. je DNS-registrar of zakelijke adres).

<div class="warning custom-block" style="padding-top: 8px">
Wees voorzichtig met strikte DMARC-policies (<code>quarantine</code> of <code>reject</code>) — die kunnen legitieme e-mails blokkeren als SPF of DKIM verkeerd is geconfigureerd. Begin met <code>p=none</code> om eerst te monitoren voordat je strenger wordt.
</div>

# ionCube Loader

ionCube is a technology that protects PHP code from being read or copied. Developers compile their PHP scripts into encrypted bytecode, which the **ionCube Loader** (a PHP extension) decrypts and executes on the server at runtime. It's commonly used to distribute and license commercial PHP applications without exposing the source code.

<br>

## Benefits

- **Security** — Encrypted code makes it much harder for attackers to inject malware or backdoors into core files.
- **Reliability** — Locked files guarantee you're running exactly the code the developer intended — no bugs from accidental edits.
- **Performance** — The optimised bytecode runs fast and has virtually no impact on your site's speed.

<br>

## Enable ionCube

You can enable the ionCube Loader from the **Developer Tools** panel.

<div class="warning custom-block" style="padding-top: 8px">
ionCube is <b>not supported on PHP 8.0</b>, which was treated as a transitional version. It works on <b>PHP 8.1 and all later versions</b>.
</div>

<img width="846" height="178" alt="image" src="https://github.com/user-attachments/assets/c471b1a7-4ab0-49b4-a373-71531b5e3f44" />

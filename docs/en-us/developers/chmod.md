# Secure File and Directory Permissions

Setting the right file and directory permissions is essential to prevent unauthorised access to — or modification of — your WordPress site. Incorrect permissions can allow attackers to overwrite files, inject malicious code, or take full control of your website.

<div class="info custom-block" style="padding-top: 8px">
The panel automatically assigns recommended permissions by default. For extra security, we recommend setting <code>wp-config.php</code> to <b>440</b>.
</div>

<br>

## Recommended permissions

- **Files: `644`** — The owner can read and write; everyone else can only read.
- **Directories: `755`** — The owner can read, write, and execute; everyone else can read and execute.
- **`wp-config.php`: `440`** — Restricts access to sensitive configuration details.

**Tips:**

- Never use `777`. It grants write access to everyone and is a major security risk.
- Audit permissions regularly, especially after installing new plugins or themes.

<br>

## Set WordPress core files to 444

Applying `444` (read-only) permissions to all files inside the `wp-includes` directory is a simple but effective hardening step.

The `wp-includes` folder contains core libraries that WordPress needs to **read and execute** — but never modifies during normal operation. Making these files read-only prevents malicious code, vulnerable plugins, or compromised admin accounts from injecting or altering core functionality. This significantly reduces the risk of persistent malware infections.

<div class="warning custom-block" style="padding-top: 8px">
Do <b>not</b> apply <code>444</code> to the <code>wp-includes</code> directory itself — only to the files inside it. Directories need the <i>execute</i> permission to be accessible. If you accidentally remove it, log in via SFTP and reset the directory permissions to <code>755</code>.
</div>

<br>

**To set secure permissions across all wp-includes files:**

1. Log in via [SSH](#).
2. Go to your main website directory:
   ```bash
   cd public_html
   ```
3. Run the following command:
   ```bash
   find wp-admin wp-includes -type f -exec chmod 444 {} \;
   ```

<br>

## How to edit permissions

You can change permissions on any file or folder by **right-clicking** it and selecting **Permissions** from the menu.

<img width="935" height="491" alt="image" src="https://github.com/user-attachments/assets/30334757-0643-425e-941d-27d0ad63e458" />

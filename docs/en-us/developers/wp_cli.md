# Reinstall WordPress Core via CLI

Reinstalling the WordPress core files via WP-CLI is a fast way to fix corrupted core files or remove suspicious code from your installation.

<div class="warning custom-block" style="padding-top: 8px">
Always create a <b>backup</b> of your website before proceeding. Reinstalling core files cannot be undone.
</div>

<br>

## Reinstall the core files

1. Log in to your server via SSH. If you're not sure how, [follow this guide](#).
2. Navigate to the root directory of your WordPress installation:

   ```bash
   cd public_html
   ```

3. Verify you're in the correct directory by checking for the `wp-config.php` file.

   <div class="tip custom-block" style="padding-top: 8px">
   <b>Optional but recommended:</b> Delete the <code>wp-admin</code> and <code>wp-includes</code> directories before reinstalling. This helps remove any unwanted or malicious code that may have been injected into the core.
   </div>

   ```bash
   rm -rf wp-admin
   rm -rf wp-includes
   ```

4. Reinstall the WordPress core files:

   ```bash
   wp core download --force
   ```

5. Update the database if needed:

   ```bash
   wp core update-db
   ```

Your core files are now successfully reinstalled.

# Change Database Prefix

By default, WordPress uses `wp_` as the prefix for all database tables. Changing it to a unique, random prefix improves security by blocking automated SQL injection attacks that specifically target the default prefix.

This guide walks you through the process in **four steps**.

<div class="warning custom-block" style="padding-top: 8px">
This is a <b>sensitive database operation</b>. Always create a full backup of your database before you begin — a single mistake can bring your entire site down. We also recommend performing this procedure during a low-traffic period.
</div>

<br>

## Step 1 — Update your `wp-config.php`

1. Connect to your site via **SFTP** or **SSH** and open your `wp-config.php` file.
2. Locate the line that defines the table prefix:

   ```php [/public_html/wp-config.php]
   $table_prefix = 'wp_';
   ```

3. Change `'wp_'` to a new, unique prefix. It should end with an underscore — use a random string of letters and numbers:

   ```php [/public_html/wp-config.php]
   // Example of a new, secure prefix
   $table_prefix = 'wp_a7d3f8_';
   ```

4. Save the file.

<div class="info custom-block" style="padding-top: 8px">
At this point your site will be broken and show a database connection error. This is expected — we'll fix it in the next steps by renaming the database tables to match.
</div>

<br>

## Step 2 — Rename all database tables

Now rename the core WordPress tables (and any plugin tables) that still use the old prefix. The easiest way to do this is with a series of SQL queries.

1. Log in to your database using **phpMyAdmin** or the command-line client.
2. Generate the `RENAME` queries automatically by running:

   ```sql
   SELECT CONCAT(
     'RENAME TABLE ', table_name, ' TO ',
     REPLACE(table_name, 'wp_', 'wp_a7d3f8_'), ';'
   )
   FROM information_schema.tables
   WHERE table_name LIKE 'wp_%';
   ```

   > Replace `wp_` and `wp_a7d3f8_` with your old and new prefixes.

3. The query above outputs a list of `RENAME` commands. Copy that list and run it as a new SQL query. It should look like this:

   ```sql
   RENAME TABLE wp_commentmeta TO wp_a7d3f8_commentmeta;
   RENAME TABLE wp_comments TO wp_a7d3f8_comments;
   RENAME TABLE wp_links TO wp_a7d3f8_links;
   RENAME TABLE wp_options TO wp_a7d3f8_options;
   RENAME TABLE wp_postmeta TO wp_a7d3f8_postmeta;
   RENAME TABLE wp_posts TO wp_a7d3f8_posts;
   RENAME TABLE wp_termmeta TO wp_a7d3f8_termmeta;
   RENAME TABLE wp_terms TO wp_a7d3f8_terms;
   RENAME TABLE wp_term_relationships TO wp_a7d3f8_term_relationships;
   RENAME TABLE wp_term_taxonomy TO wp_a7d3f8_term_taxonomy;
   RENAME TABLE wp_usermeta TO wp_a7d3f8_usermeta;
   RENAME TABLE wp_users TO wp_a7d3f8_users;
   -- ...and so on for any plugin tables
   ```

After running these commands, your site should start working again — but there are still two places where the old prefix is stored.

<br>

## Step 3 — Update the `wp_options` table

The `wp_options` table (now renamed to `wp_a7d3f8_options`) contains a field called `wp_user_roles`. This field name is based on the old prefix and must also be updated.

Run the following SQL query:

```sql
UPDATE wp_a7d3f8_options
SET option_name = 'wp_a7d3f8_user_roles'
WHERE option_name = 'wp_user_roles';
```

> Replace the prefixes with your new and old ones.

This ensures WordPress can still correctly identify user roles and permissions. If you skip this step, all users — including administrators — may lose their permissions.

<br>

## Step 4 — Update the `wp_usermeta` table

The `wp_usermeta` table contains multiple rows that use the old prefix as part of the `meta_key`. These also need to be updated.

Run the following SQL query:

```sql
UPDATE wp_a7d3f8_usermeta
SET meta_key = REPLACE(meta_key, 'wp_', 'wp_a7d3f8_');
```

This finds every occurrence of the old prefix in the `meta_key` column and replaces it with the new one. It restores user capabilities, dashboard settings, and other user-specific metadata.

<br>

## Final check

After completing all four steps, clear any caching on your site (object cache, page cache, etc.) and test thoroughly:

- Can you log in and out?
- Do administrator users still have their privileges?
- Are posts, pages, and media loading correctly?
- Do your plugins still function as expected?

If everything works, the procedure is complete. Your database is now hardened against one of the most common attack vectors.

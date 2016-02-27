require 'compass/import-once/activate'

# Require any additional compass plugins here.
require 'support-for'
require 'susy'
require 'breakpoint'

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
fonts_dir = "fonts"
javascripts_dir = "js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
if environment == :production
  output_style = :compressed
else
  output_style = :expanded
#  sass_options = { :debug_info => true }
end

# Désactiver l'ajout du cache buster sur les images appelées via la fonction image-url().
asset_cache_buster :none

# To enable relative paths to assets via compass helper functions. Uncomment:
 relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

Jekyll::Hooks.register :site, :post_write do |site|
  gulp = File.join(site.source, 'node_modules', '.bin', 'gulp')
  system "#{gulp} minifyHTML --silent"
  system "#{gulp} minifyJSON --silent"
end

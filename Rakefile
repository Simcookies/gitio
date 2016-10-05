require 'time'

# Usage: rake post title="A title" [date="2016-10-01"]
desc "Create a new post"
task :post do
  unless FileTest.directory?('./_posts')
    abort("rake aborted: '_posts' direcroty not found.")
  end
  title = ENV["title"] || "new-post"
  slug = title.downcase.strip.gsub(' ','-').gsub(/[^\w-]/, '')

  begin
    datetime = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d %H:%M:%S %z')
    date = datetime.split.first
  rescue Exception => e
    puts "Error: date format must be YYYY-MM-DD!"
    exit -1
  end

  filename = File.join('.', '_posts', "#{date}-#{slug}.md")
  if File.exist?(filename)
    abort("rake aborted: #{filename} already exists.")
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "title: \"#{title.gsub(/-/, ' ')}\""
    post.puts "date: #{datetime}"
    post.puts "category:"
    post.puts "tags:"
    post.puts "---"
  end
end

desc "Create a new draft"
task :draft do
  unless File.directory?('./_drafts')
    abort("rake aborted: '_drafts' directory not found.")
  end
  title = ENV["title"] || "new-draft"
  slug = title.downcase.strip.gsub(' ','-').gsub(/[^\w-]/, '')
  filename = File.join('.', '_drafts', "#{slug}.md")
  if File.exist?(filename)
    abort("rake aborted: #{filename} already exists.")
  end

  puts "Creating new draft: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "title: \"#{title.gsub(/-/, ' ')}\""
    post.puts "category:"
    post.puts "tags:"
    post.puts "---"
  end
end

desc "Push to Github"
task :push do
  puts "Pushing to `source' branch:"
  system "git push origin source"
  puts "`source' branch updated."
  puts

  puts "Building site...."
  system "bundle exec jekyll build"
  puts

  cd '_site' do
    puts "Pushing to `master' branch:"
    system "git add -A"
    system "git commit -m 'Update at #{Time.now.utc}'"
    system "git push origin master"
    puts "`master' branch updated."
  end
end

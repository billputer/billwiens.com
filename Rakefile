require 'time'

desc 'Build and deploy site with Jekyll'
task :deploy do |t, args|
    puts "Rakefile: Building with a production configuration."
    sh 'bundle exec jekyll build --config _config.yml,_config-production.yml --trace'
    sh 'aws s3 sync _site s3://billwiens.com/ --acl public-read --delete'

    date = Time.now.utc.iso8601
    sh "aws cloudfront create-invalidation --distribution-id E34DEV4FN243D3 --invalidation-batch \"Paths={Quantity=1,Items=[\\\"/*\\\"]},CallerReference=#{date}\""
end


desc 'Use Jekyll to serve a local site.'
task :serve do |t, args|
    sh 'bundle exec jekyll serve'
end

# billwiens.com

This is the official source code for [billwiens.com](http://billwiens.com). Accept no substitutes.

# instructions

```bash
# setup
brew install chruby ruby-install
ruby-install ruby 3.1.2
chruby 3.1.2
gem install bundler
bundle install

# build
rake serve
rake deploy

```
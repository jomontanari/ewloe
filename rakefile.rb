#require "tools/jsmin"

task :default => [:append_files]

task :clean do
  if (File.exist?("mockit.js"))
    File.delete("mockit.js")
  end
end

task :append_files do
  puts 'Appending files'
  File.open("mockit.js", "w") do |output_file|
    Dir["src/*.js"].each do |src_file|
      f = File.open(src_file, 'r+');

      f.each_line do |line|
        output_file.write(line)
      end

      puts "Written file"
      output_file.write("\n")
    end
  end
end

task :minify do
end
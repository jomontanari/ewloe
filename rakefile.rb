#require "tools/jsmin"

task :default => [:append_files]

task :clean do
  if (File.exist?("ewloe.js"))
    File.delete("ewloe.js")
  end
end

task :append_files do
  File.open("ewloe.js", "w") do |output_file|
    Dir["src/*.js"].each do |src_file|
      f = File.open(src_file, 'r+');

      f.each_line do |line|
        output_file.write(line)
      end

      output_file.write("\n")
    end
  end

  puts "Complete"
end

task :minify do
end
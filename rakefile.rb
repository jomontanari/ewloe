require "tools/jsmin"

task :default => [:combine]

task :clean do
  if (File.exist?("mockit.js"))
    File.delete("mockit.js")
  end
end

task :combine => [:clean, :append_files, :minify] do
end

task :append_files do
  File.open("mockit.js", "w") do |output_file|
    Dir["src/*.js"].each do |src_file|
      f = File.open(src_file, 'r+');

      f.each_line do |line|
        output_file.write(line)
      end

      output_file.write("\n")
    end
  end
end

task :minify do
  jsmin()
end
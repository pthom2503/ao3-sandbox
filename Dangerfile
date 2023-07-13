REPO_FULL_NAME = github.pr_json["base"]["repo"]["full_name"]

contributors = github.api.contributors(REPO_FULL_NAME).map(&:login)

if contributors.include?(github.pr_author)
  message("welcome back!")
else
  message("hello, new person!")
end

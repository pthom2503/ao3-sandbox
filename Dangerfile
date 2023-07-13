REPO_FULL_NAME = pr_json["base"]["repo"]["full_name"]

contributors = github.api.contributors(REPO_FULL_NAME).map(&:id)

if contributors.include?(pr.user.id)
  message("welcome back!")
else
  message("hello, new person!")
end

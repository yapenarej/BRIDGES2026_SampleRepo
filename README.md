# Scholarships site (docs/)

This small static site lists scholarships open to Papua New Guineans. It lives in the `docs/` folder so it can be published via GitHub Pages.

How to publish
1. Commit the `docs/` folder to the `main` branch of this repository.
2. In the repository Settings → Pages, set the source to "Deploy from a branch", choose branch `main` and folder `/docs`.
3. Save. The site will be published at:
   `https://<your-github-username>.github.io/BRIDGES2026_SampleRepo/`

Edit scholarships
- Edit `docs/data/scholarships.json` to add or update scholarship entries.
- Each entry is a JSON object with fields:
  - id (string, unique)
  - name
  - provider
  - level (e.g. Undergraduate, Postgraduate, Short Course)
  - eligible
  - deadline
  - link (URL)
  - country
  - description
  - contact (email)

Contributing
- Add or update entries and open a pull request.
- Keep entries factual and include official provider links where possible.

Example git workflow

```
git checkout -b add-scholarship
# edit docs/data/scholarships.json
git add docs/data/scholarships.json
git commit -m "Add example scholarship entry"
git push origin add-scholarship
# Open a PR on GitHub to merge into main
```

Notes
- The sample entries are placeholders — please replace them with authoritative links and current deadlines.
- If you want a custom domain or more advanced features (categories, email alerts, admin forms), I can extend this site to include those.

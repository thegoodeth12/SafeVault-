from pathlib import Path
import zipfile

# File contents
license_text = """MIT License

Copyright (c) 2025 SafeVault Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

readme_text = """# SafeVault 🔐

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

SafeVault is a secure dashboard for Safe{Wallet}, providing transaction control, threshold management, and GitHub/Discord integrations.

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
"""

package_json = """{
  "name": "safevault",
  "version": "1.0.0",
  "description": "Secure Safe{Wallet} Dashboard",
  "author": "SafeVault Contributors",
  "license": "MIT"
}
"""

# Create files in a temporary directory
project_dir = Path("/mnt/data/safevault-license")
project_dir.mkdir(parents=True, exist_ok=True)

(project_dir / "LICENSE").write_text(license_text)
(project_dir / "README.md").write_text(readme_text)
(project_dir / "package.json").write_text(package_json)

# Create a zip archive
zip_path = "/mnt/data/safevault_license_package.zip"
with zipfile.ZipFile(zip_path, 'w') as zipf:
    for file_path in project_dir.glob("*"):
        zipf.write(file_path, file_path.name)

zip_path

param(
    [switch]$Help
)

if ($Help) {
    Write-Host "Usage: .\sync_from_plugins.ps1"
    Write-Host "This script copies the active plugin files from the Antigravity system folder back to this repository for version control."
    exit
}

$RepoDir = "C:\Users\wang6\.gemini\antigravity\scratch\agy-pptx-studio"
$SystemPluginsDir = "C:\Users\wang6\.gemini\config\plugins"

$PluginsToSync = @("presentation_architect", "antigravity-image-master")

Write-Host "Starting sync from System Plugins to Local Repo..." -ForegroundColor Cyan

foreach ($Plugin in $PluginsToSync) {
    $SourcePath = Join-Path $SystemPluginsDir $Plugin
    $DestPath = Join-Path $RepoDir $Plugin

    if (Test-Path $SourcePath) {
        Write-Host "Syncing $Plugin..."
        Copy-Item -Path "$SourcePath\*" -Destination $DestPath -Recurse -Force
        Write-Host "Successfully synced $Plugin." -ForegroundColor Green
    } else {
        Write-Host "Warning: Could not find $Plugin in $SystemPluginsDir" -ForegroundColor Yellow
    }
}

Write-Host "Sync complete! You can now review changes with 'git status' and commit them." -ForegroundColor Cyan

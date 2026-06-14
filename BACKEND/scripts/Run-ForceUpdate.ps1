param(
    [string[]]$Usernames
)

$Endpoints = @(
    @{
        Name = "PAPERLESS"
        Url  = "https://paperless.ubagroup.com/hr.service/regularize.aspx?cmd=forceupdate&username="
    },
    @{
        Name = "10.100.5.195"
        Url  = "http://10.100.5.195/hrservice.web/regularize.aspx?cmd=forceupdate&username="
    }
)

$results = @()

foreach ($user in $Usernames) {

    foreach ($endpoint in $Endpoints) {

        try {

            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

            # build final URL
            $url = $endpoint.Url + [System.Uri]::EscapeDataString($user)

            # call endpoint
            $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 90

            # clean response
            $responseText = ($resp.Content | Out-String).Trim()

            # -------------------------
            # 1. FRONTEND OUTPUT LINE
            # -------------------------
            Write-Output "$user - $($endpoint.Name) - $responseText"

            # -------------------------
            # 2. STRUCTURED RESULT (FOR EXCEL)
            # -------------------------
            $results += [pscustomobject]@{
                Username  = $user
                Source    = $endpoint.Name
                Response  = $responseText
                Timestamp = $timestamp
            }
        }
        catch {

            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            $errorMsg = $_.Exception.Message

            # frontend output
            Write-Output "$user - $($endpoint.Name) - ERROR: $errorMsg"

            # structured output
            $results += [pscustomobject]@{
                Username  = $user
                Source    = $endpoint.Name
                Response  = "ERROR: $errorMsg"
                Timestamp = $timestamp
            }
        }
    }
}

# return structured data to Node.js
$results | ConvertTo-Json -Depth 3
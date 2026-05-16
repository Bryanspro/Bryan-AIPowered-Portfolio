import urllib.request, json
req = urllib.request.Request('https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyCUak8HGP8F8aHWaAkE2CknF4bOHPBwYjE')
res = urllib.request.urlopen(req).read().decode('utf-8')
data = json.loads(res)
for m in data.get('models', []):
    print(m['name'])

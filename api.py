import requests
import sys

#img = './uploads/' + sys.argv[1]
img = './uploads/images-1621344489017.jpg'
api_user_token = 'f65ba9b5e48979377e5f52e7cf86fb7448a8029f'
headers = {'Authorization': 'Bearer ' + api_user_token}

# Single/Several Dishes Detection
url = 'https://api.logmeal.es/v2/recognition/complete'
resp = requests.post(url,
                    files={'image': open(img, 'rb')},
                    headers=headers)

#print(resp.json()) 
data = str(resp.json()['imageId'])
#print(type(data))
# Nutritional information
url = 'https://api.logmeal.es/v2/recipe/nutritionalInfo'
fin = requests.post(url,
                    json={'imageId': resp.json()['imageId']},
                    headers=headers)

#print(data)

if(resp.json()):
    print(resp.json())
    print(fin.json())
else:
    print("Error with the api")

#print(img)
#sys.stdout.flush()
#return resp.json()['recognition_results']  
# from django.shortcuts import render
# from django.core.cache import cache
# import requests
# from django.http import JsonResponse
# from django.conf import settings

# def fetch_health_tips(request):
#     search_query = request.GET.get('query', 'health tips')
#     input_query = f"how to reduce {search_query}" 

#     # api_key = settings.SERP_API_KEY
#     api_key = "02cb346c5cded4dda5214e485e864d3472b5fe05b3523a28ef83aa9f94a176c5"
#     try:
#         response = requests.get(f"https://serpapi.com/search.json?q={input_query}&hl=en&gl=us&api_key={api_key}")
#         # response_data = response.json()
#         return JsonResponse(response)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)

from django.http import JsonResponse
from django.conf import settings
from serpapi import GoogleSearch

def fetch_health_tips(request):
    search_query = request.GET.get('query', 'health tips')
    input_query = f"how to reduce {search_query.replace(' ', '+')}" if search_query else 'health tips'
    api_key = settings.CRAWLER_API_KEY

    params = {
        "q": input_query,
        "location": "United States",
        "hl": "en",
        "gl": "us",
        "api_key": "958bf62801e581c8f20c7811b15ac2eb79c8ee810454041b084392f226fddaed",
        # "api_key": api_key,
        "tbm" : "vid"
    }

    try:
        search = GoogleSearch(params)
        results = search.get_dict()
        # print(results["video_results"])
        return JsonResponse(results["video_results"], safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
from django.http import JsonResponse
import requests

def get_nearby_hospitals(request):
    api_key = settings.TOMTOM_API_KEY
    print(api_key)
    longitude = request.GET.get('longitude', '')
    latitude = request.GET.get('latitude', '')

    url = f"https://api.tomtom.com/search/2/categorySearch/hospital.json?key={api_key}&lat={latitude}&lon={longitude}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        hospitals = []
        for hospital in data['results']:
            name = hospital['poi']['name']
            distance = hospital['dist']
            address = hospital['address']['freeformAddress']  # Adjust this according to TomTom API response structure
            latitude = hospital['position']['lat']
            longitude = hospital['position']['lon']
            hospitals.append({'name': name, 'distance': distance, 'address': address, 'latitude': latitude, 'longitude': longitude})
        return JsonResponse({'hospitals': hospitals})
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)


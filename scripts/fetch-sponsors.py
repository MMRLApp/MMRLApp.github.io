import requests
import json
import os
from collections import defaultdict

GRAPHQL_URL = "https://api.github.com/graphql"

GRAPHQL_QUERY = """
query($org: String!) {
  organization(login: $org) {
     sponsorshipsAsMaintainer(activeOnly: false, first: 100) {
      nodes {
        sponsorEntity {
          ... on User {
            login
            avatarUrl
            url
          }
          ... on Organization {
            login
            avatarUrl
            url
          }
        }
        tier {
          monthlyPriceInCents
        }
      }
    }
  }
}
"""

def fetch_sponsors(github_token, org):
    headers = {
        "Authorization": f"Bearer {github_token}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(
        GRAPHQL_URL,
        json={"query": GRAPHQL_QUERY, "variables": {"org": org}},
        headers=headers
    )
    response.raise_for_status()
    
    return response.json()

def merge_sponsors(sponsors_list):
    sponsors_dict = defaultdict(lambda: {"avatarUrl": "", "url": "", "amount": 0})
    
    for sponsor in sponsors_list:
        login = sponsor["login"]
        sponsors_dict[login]["avatarUrl"] = sponsor["avatarUrl"]
        sponsors_dict[login]["url"] = sponsor["url"]
        sponsors_dict[login]["amount"] += sponsor["amount"]
    
    return list({"login": k, **v} for k, v in sponsors_dict.items())

def main():
    github_token = os.getenv("SPONSORS_TOKEN")
    if not github_token:
        raise ValueError("GitHub token is not set in environment variables")
    
    orgs = ["MMRLApp", "DerGoogler"]
    all_sponsors = []
    
    for org in orgs:
        sponsors_data = fetch_sponsors(github_token, org)
        sponsors = [
            {
                "login": node["sponsorEntity"]["login"],
                "avatarUrl": node["sponsorEntity"]["avatarUrl"],
                "url": node["sponsorEntity"]["url"],
                "amount": node["tier"]["monthlyPriceInCents"]
            }
            for node in sponsors_data.get("data", {}).get("organization", {}).get("sponsorshipsAsMaintainer", {}).get("nodes", [])
        ]
        all_sponsors.extend(sponsors)
    
    merged_sponsors = merge_sponsors(all_sponsors)
    print(json.dumps(merged_sponsors, indent=2))

if __name__ == "__main__":
    main()

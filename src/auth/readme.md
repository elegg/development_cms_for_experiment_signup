Currently able to use MS OPEN GRAPH to sign in users.

We restrict this to people with emails registered on the uniri network using a single tenant set up for uniri and credentials from Azure


## Constraints

Needs to combine with payload built in auth for users outside of uniri and for future proofing if uniri moves to system we cannot work with. 

## Strategy


### Oauth
Standard oauth flow building on the node MSAL package for microsofts opengraph set up.

One end point points to the MSFT login and provides callback endpoint parameter

Callback endpoint retrieves access token and then requests profile data from MSFT opengraph. This has the dual purpose of getting the data and verifying that received token is definitely correct. 

### Local Users

UPSERT users in the db base on the profile data received and attach a token and expiry data to the user info.

# Hangouts

Hangouts represent an event created by any user in the system. It has an organizer, a title, a description, a location, a start time, and an end time.

We wanted to segregate this module as a separate microservice, but due to time and budget constraints, we decided to keep it as a module.

## Location

Location is stored in system as:

```typescript
  locationTitle      String?
  locationAddress    String?
  locationLat        Float?
  locationLong       Float?
  locationProvider   String?
  locationProviderId String?
  isLocationPrivate  Boolean?
```

It also has locationGps thats added through custom migration as Prisma doesn't support PostGIS yet.

### Location Caveats

- We have to write a custom query for near by events **(not implemented yet)**

## Invites

Hangout Invites are sent to users who are invited to a hangout.

### Invites Caveats

- We are pulling participants from the HangoutInvites model. Participants should be implemented as a separate model as app grows.

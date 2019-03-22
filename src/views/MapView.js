// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon
} from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { MAP_STYLE } from '../style/mapStyle';
import mockAreas from '../mock_data/areas';
import { setClaim, removeClaim } from '../redux/actions/claims';
import { getAreaClaim, getAreaById } from '../selectors/areas';
import { getClanById } from '../selectors/clans';
import { setCurrentView, setSelectedArea } from '../redux/actions/ui';

// import { MarkerIcon } from '../svg/MarkerIcon';
import colors from '../style/colors';

const mapStateToProps = state => {
  return {
    ui: state.ui,
    claims: state.claims,
    clans: state.clans,
    areas: state.areas,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setClaim: claim => dispatch(setClaim(claim)),
    removeClaim: areaId => dispatch(removeClaim(areaId)),
    setCurrentView: currentView => dispatch(setCurrentView(currentView)),
    setSelectedArea: areaId => dispatch(setSelectedArea(areaId))
  };
};

type State = {};

type Props = {
  ui: Object,
  claims: Object,
  clans: Object,
  areas: Object,
  user: Object,
  setClaim: Object => void,
  removeClaim: string => void,
  setCurrentView: string => void,
  setSelectedArea: (?string) => void
};

class MapView extends Component<Props, State> {
  mapRef = null;

  renderAreas() {
    return this.props.areas.map(area => {
      const areaClaim = getAreaClaim(this.props.claims.claims, area.areaId);
      const fulfilledClaim = this.props.claims.fulfilledClaim.find(claim => claim && claim.areaId === area.areaId);

      let fillColor = '#000';
      if (
        this.props.ui.selectedAreaId &&
        this.props.ui.selectedAreaId === area.areaId
      ) {
        fillColor = colors.yellow;
      } else if (areaClaim) {
        fillColor = 'red';
        if (areaClaim.clanId === this.props.ui.selectedClanId) {
          fillColor = 'white';
        }
      } else if (fulfilledClaim) {
        if (fulfilledClaim.clanId === this.props.ui.selectedClanId) {
          fillColor = 'green';
        }
      }

      return (
        <Polygon
          path={area.polygon.coordinates}
          key={area.areaId}
          options={{
            fillColor: fillColor,
            fillOpacity: 0.4,
            strokeColor: '#000',
            strokeOpacity: 1,
            strokeWeight: 1
          }}
          onClick={() => {
            this.props.setSelectedArea(area.areaId);
          }}
        />
      );
    });
  }

  renderClaimView() {
    const { ui, claims, clans, areas, user, setCurrentView } = this.props;
    if (!ui.selectedAreaId) return null;
    const areaClaim = getAreaClaim(claims.claims, ui.selectedAreaId);
    const selectedAreaIsClaimedByMe =
      areaClaim && areaClaim.clanId === ui.selectedClanId;
    const selectedArea = getAreaById(areas, ui.selectedAreaId);

    return (
      <div>
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: selectedAreaIsClaimedByMe ? 350 : 200,
            width: '100%',
            padding: 10,
            zIndex: 1,
            bottom: 0,
            backgroundColor: colors.background,
            opacity: colors.backgroundOpacity,
            color: 'white'
          }}
        >
          {selectedAreaIsClaimedByMe && (
            <div
              style={{
                fontSize: 25,
                marginBottom: 20,
                textAlign: 'flex-start'
              }}
            >
              Dette området må ryddes innen {selectedArea.time} dager.
            </div>
          )}
          <div
            style={{ color: colors.yellow, fontSize: 20, fontWeight: 'bold' }}
          >
            {selectedArea.areaName}
          </div>
          <div>Type: Park</div>
          <div>Størrelse: {selectedArea.size}m2</div>
          <div>Poengfaktor: {selectedArea.pointFactor}</div>
        </div>
        {selectedAreaIsClaimedByMe ? (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              bottom: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              onClick={() => {
                setCurrentView('COMPLETE');
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: '80%',
                zIndex: 1,
                backgroundColor: colors.hamburgerMenu,
                marginBottom: 10
              }}
            >
              <div style={{ color: 'white' }}>ANGI SOM FULLFØRT</div>
            </div>
            <div
              onClick={() => {
                this.props.removeClaim(selectedArea.areaId);
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: '80%',
                zIndex: 1,
                backgroundColor: colors.hamburgerMenu
              }}
            >
              <div style={{ color: 'white' }}>FJERN KRAV</div>
            </div>
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              width: '100%',
              backgroundColor: 'red',
              bottom: 30,
              justifyContent: 'center'
            }}
          >
            <div
              onClick={() => {
                if (!areaClaim) {
                  this.props.setClaim({
                    clanId: this.props.ui.selectedClanId,
                    areaId: selectedArea.areaId,
                    time: new Date()
                  });
                }
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: '80%',
                zIndex: 1,
                backgroundColor: colors.hamburgerMenu
              }}
            >
              <div style={{ color: 'white' }}>
                {areaClaim
                  ? 'Ryddes av ' +
                    getClanById(clans.clans, areaClaim.clanId).clanName
                  : 'Gjør krav på'}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { ui } = this.props;
    // const bounds = new window.google.maps.LatLngBounds();
    // const coordinates = this.props.subjects.map(subject => {
    //   const { latitude, longitude } = subject.position;
    //   const latLng = new window.google.maps.LatLng(latitude, longitude);
    //   bounds.extend(latLng);
    // });
    // if (coordinates.length > 0 && !selectedSubject) {
    //   this.mapRef.fitBounds(bounds);
    // }

    // Wait for Google Maps API hack
    if (!window.google) {
      window.setTimeout(() => {
        console.log('maps api not available yet');
        this.forceUpdate();
      }, 500);
      return null;
    }
    const MapsComponent = withGoogleMap(props => (
      <GoogleMap
        ref={map => {
          this.mapRef = map;
          //   if (map && coordinates.length > 0 && !selectedSubject) {
          //     map.fitBounds(bounds);
          //   }
        }}
        defaultZoom={15}
        center={{
          lat: 59.92344,
          lng: 10.75606
        }}
        options={{
          streetViewControl: false,
          styles: MAP_STYLE,
          fullscreenControl: false,
          mapTypeControl: false
        }}
        onClick={() => this.props.setSelectedArea(null)}
      >
        {this.renderAreas()}
      </GoogleMap>
    ));
    return (
      <div
        style={{
          zIndex: -1,
          position: 'absolute',
          height: '100vh',
          width: window.innerWidth
        }}
      >
        {this.renderClaimView()}

        <MapsComponent
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: '100vh' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(MapView);

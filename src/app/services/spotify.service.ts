import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQCTGfsny68JA31oIzhmZ4Vdy4BtMPwbA6jHZR6JD6IBldvfhGFI9qe6Nhv35nW6QHz1la-2HIfTlDIhoKiOVJ8kqAwk7ugXwhsxLIv0QPjG_oH6pTFC',
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data: any) => data['albums'].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data: any) => data['artists'].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe( map( data => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => data['tracks'])
    );
  }
}

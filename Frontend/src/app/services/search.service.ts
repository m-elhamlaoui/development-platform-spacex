import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchReplyDto} from "../DTO/searchReply.dto";
import {SearchDto} from "../DTO/search.dto";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    searchEndpoint = "api/v1/searchTravel";

    constructor(public http: HttpClient) {
    }

    search(searchDto: SearchDto): Observable<SearchReplyDto[]> {
<<<<<<< HEAD
        return this.http.post<SearchReplyDto[]>(this.searchEndpoint, searchDto);
    }
=======
        return this.http.post<SearchReplyDto[]>(this.searchEndpoint, searchDto||{});
    }

>>>>>>> newStyle
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BasketRequestAddDelDto } from "../DTO/basketRequestAddDel.dto";
import { BasketRequestDto } from "../DTO/basketRequest.dto";
import { CreateBasketReplyDto } from "../DTO/createBasketReply.dto";
import { SearchReplyDto } from '../DTO/searchReply.dto';

@Injectable({
    providedIn: 'root'
})
export class BasketService {
    private baseUrl = '/api/v1';

    constructor(private http: HttpClient) { }

    createBasket(): Observable<CreateBasketReplyDto> {
        return this.http.post<CreateBasketReplyDto>(`${this.baseUrl}/createBasket`, {});
    }

    getBasket(dto: BasketRequestDto): Observable<SearchReplyDto[]> {
        return this.http.post<SearchReplyDto[]>(`${this.baseUrl}/getBasket`, dto);
    }

    addToBasket(dto: BasketRequestAddDelDto): Observable<SearchReplyDto[]> {
        return this.http.post<SearchReplyDto[]>(`${this.baseUrl}/addToBasket`, dto);
    }

    removeFromBasket(dto: BasketRequestAddDelDto): Observable<SearchReplyDto[]> {
        return this.http.post<SearchReplyDto[]>(`${this.baseUrl}/removeFromBasket`, dto);
    }
}

//
//  Country.swift
//  placer
//
//  Created by Ty Nasello on 2022-10-15.
//

import Foundation

struct Country: Decodable, Hashable {
    let name: String
    let code: String
}

class Countries: ObservableObject {
    let countriesList: [Country]

    init() {
        let url = Bundle.main.url(forResource: "countries", withExtension: "json")!
        let data = try! Data(contentsOf: url)
        countriesList = try! JSONDecoder().decode([Country].self, from: data)
    }
}


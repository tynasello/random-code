//
//  ContentView.swift
//  placer
//
//  Created by Ty Nasello on 2022-10-15.
//

import SwiftUI

extension String{
    func load() -> UIImage {
        do {
            guard let url = URL(string: self)
            else {
                return UIImage()
            }
            let data: Data = try Data(contentsOf: url)
            return UIImage(data: data) ?? UIImage()
        } catch {}
        return UIImage()
    }

    func replace(string: String, replacement: String) -> String {
        return self.replacingOccurrences(of: string, with: replacement, options: NSString.CompareOptions.literal, range: nil)
    }

    func removeWhitespace() -> String {
        return self.replace(string: " ", replacement: "")
    }
}

struct ContentView: View {
    @State private var country: Country
    @State private var countries: Countries
    
    @State private var userGuess: String = ""
    @State private var userStreak: Int = 0
    @State private var userCorrectGuesses: [String] = []
    
    @State private var isUserGuessCorrect: Bool = false
    @State private var userIncorrectGuess: String = ""

    private let countryUrlAlpha = "https://raw.githubusercontent.com/djaiss/mapsicon/master/all/"
    private let countryUrlOmega = "/1024.png"

    init() {
        countries = Countries()
        country = Countries().countriesList.randomElement()!
    }
    
    func isGuessCorrect() -> Bool {
        if(country.name.removeWhitespace().lowercased() == userGuess.removeWhitespace().lowercased()) {
            return true
        }
        return false
    }
    
    func getTextFielColor() -> Color {
        if(userIncorrectGuess == "") {
            return Color.gray
        }
        return userGuess == userIncorrectGuess ? Color.red : Color.blue
    }
    
    var body: some View {
        ScrollView {
            VStack (alignment: .leading){
                Text("Country Guesser")
                    .padding(.bottom)
                    .font(.largeTitle)
                
                Text("Streak: " + String(userStreak))
                    .padding(.bottom)
                    .font(.subheadline)
                
                Image(uiImage: (countryUrlAlpha + country.code.lowercased() + countryUrlOmega).load())
                    .resizable()
                    .scaledToFit()
                    .padding(.vertical)
                
                TextField("Guess the country", text: $userGuess)
                    .padding()
                    .onSubmit {
                        if(isGuessCorrect()) {
                            isUserGuessCorrect = true;
                            userCorrectGuesses.append(country.name)
                            userStreak += 1
                            
                            userGuess = ""
                            country = countries.countriesList.randomElement()!

                        } else {
                            userIncorrectGuess = userGuess
                        }
                    }
                    .overlay(RoundedRectangle(cornerRadius: 6).stroke(getTextFielColor(), lineWidth: 1))

                
                VStack (alignment: .leading){
                    ForEach((userCorrectGuesses).reversed(), id:\.self) { userCorrectGuess in
                        HStack{
                            Image(systemName: "checkmark.circle")
                                .foregroundColor(Color(.systemGreen))
                            Text(userCorrectGuess).font(.subheadline)
                            
                        }
                        .padding(.bottom, 1)
                    }
                }
                .padding(.top, 1)
            }
            .padding()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

import UIKit
import Capacitor

class ViewController: CAPBridgeViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = UIColor.black

        if let wv = webView {
            wv.isOpaque = true
            wv.backgroundColor = UIColor.black
            wv.scrollView.backgroundColor = UIColor.black

            // Pin WKWebView to all edges of the parent view
            wv.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                wv.topAnchor.constraint(equalTo: view.topAnchor),
                wv.bottomAnchor.constraint(equalTo: view.bottomAnchor),
                wv.leadingAnchor.constraint(equalTo: view.leadingAnchor),
                wv.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            ])
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        view.backgroundColor = UIColor.black
        webView?.isOpaque = true
        webView?.backgroundColor = UIColor.black
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)

        // Force layout pass
        webView?.setNeedsLayout()
        webView?.layoutIfNeeded()

        // On iOS 26+ the WKWebView compositor may not flush until the next
        // run-loop tick — delay a reload to ensure content paints.
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
            self?.webView?.reload()
        }
    }
}

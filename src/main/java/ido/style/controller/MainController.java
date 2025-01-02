package ido.style.controller;

import ido.style.dto.CategoryDTO;
import ido.style.dto.ProductDTO;
import ido.style.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class MainController {
    @Autowired
    private ProductService productService;

    @GetMapping("/") // localhost:8080
    public String get_home(){
        return "main/home"; // 홈페이지로 가라
    }

    // 해당 카테고리의 모든 상품 리스트 화면
    @GetMapping("/product")
    public String get_cateogry(
            @RequestParam(defaultValue = "1") Integer categoryNo,
            String sort,
            Model model
    ){
        List<ProductDTO> products = productService.get_products(categoryNo, sort);
        model.addAttribute("products", products);

        return "main/category";
    }

    // 상품 하나의 화면
    @GetMapping("/product/{productNo}")
    public String get_product(
            @PathVariable Integer productNo,
            Model model
    ) {
        ProductDTO product = productService.get_product(productNo);
        List<CategoryDTO> categories = productService.get_categories();
        model.addAttribute("product", product);
        model.addAttribute("categories", categories);
        return "main/product";
    }

    // 스타일 스냅
    @GetMapping("/styles")
    public String get_stylesnap(
            @RequestParam(defaultValue = "1") Integer categoryNo,
            String sort,
            Model model
    ){
        List<ProductDTO> products = productService.get_products(categoryNo, sort);
        List<CategoryDTO> categories = productService.get_categories();
        model.addAttribute("products", products);
        model.addAttribute("categories", categories);
        return "main/styles";
    }

}
